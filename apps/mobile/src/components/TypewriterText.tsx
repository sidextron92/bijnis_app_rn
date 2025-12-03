import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

interface TypewriterTextProps {
  /** Array of words to cycle through (without "Search" prefix) */
  words: string[];
  /** Text style */
  style?: any;
  /** Text color */
  color?: string;
  /** Typing speed in milliseconds per character */
  speed?: number;
  /** Delay before deleting in milliseconds */
  deleteSpeed?: number;
  /** Delay between sequences in milliseconds */
  delayBetween?: number;
}

/**
 * TypewriterText Component
 *
 * Displays "Search " followed by animated typewriter effect for different words
 * Compatible with iOS, Android, and Web
 */
export function TypewriterText({
  words,
  style,
  color = '#9C9C9C',
  speed = 100,
  deleteSpeed = 50,
  delayBetween = 2000,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('Search ');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (words.length === 0) {
      setDisplayText('Search ');
      return;
    }

    const currentWord = words[wordIndex] || '';
    const prefix = 'Search "';
    const suffix = '"';

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (charIndex < currentWord.length) {
          setDisplayText(prefix + currentWord.substring(0, charIndex + 1) + suffix);
          setCharIndex(charIndex + 1);
          timeoutRef.current = setTimeout(handleTyping, speed);
        } else {
          // Finished typing, wait then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetween);
        }
      } else {
        // Deleting backward
        if (charIndex > 0) {
          setDisplayText(prefix + currentWord.substring(0, charIndex - 1) + suffix);
          setCharIndex(charIndex - 1);
          timeoutRef.current = setTimeout(handleTyping, deleteSpeed);
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
          setDisplayText('Search ');
          timeoutRef.current = setTimeout(handleTyping, 100);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? deleteSpeed : speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [words, wordIndex, charIndex, isDeleting, speed, deleteSpeed, delayBetween]);

  return (
    <Text style={[styles.text, style, { color }]} numberOfLines={1}>
      {displayText}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 18,
  },
});
