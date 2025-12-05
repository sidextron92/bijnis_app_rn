/**
 * SizeGuideTable - Size Guide Table Component
 *
 * A table component for displaying size guide information with columns for different sizes
 * and rows for different measurements (Length, Chest, etc).
 *
 * @platform android
 * @platform ios
 * @platform web
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../theme';
import { SushiText } from '../Text/SushiText';
import { spacing } from '../../tokens/spacing';

/**
 * Size column data
 */
export interface SizeColumn {
  /** Size label (e.g., "S", "M", "L") */
  size: string;
  /** Measurement values for each row */
  values: string[];
}

/**
 * SizeGuideTable Props
 */
export interface SizeGuideTableProps {
  /** Row labels (e.g., ["Length (Inch)", "Chest (Inch)"]) */
  rowLabels: string[];
  /** Size columns data */
  sizeColumns: SizeColumn[];
  /** Footer note (e.g., disclaimer about measurements) */
  footerNote?: string;
}

/**
 * SizeGuideTable Component
 *
 * Displays a scrollable size guide table with column headers for sizes
 * and rows for different measurements. Includes an optional footer note.
 *
 * @example
 * ```tsx
 * <SizeGuideTable
 *   rowLabels={["Length (Inch)", "Chest (Inch)"]}
 *   sizeColumns={[
 *     { size: "S", values: ["24", "34"] },
 *     { size: "M", values: ["24", "34"] },
 *     { size: "L", values: ["24", "34"] },
 *   ]}
 *   footerNote="**0.75 +/- inches may vary on physical product due to wash/shrinkage**"
 * />
 * ```
 */
export const SizeGuideTable: React.FC<SizeGuideTableProps> = ({
  rowLabels,
  sizeColumns,
  footerNote,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.tableContainer,
            {
              borderColor: theme.colors.border.default,
              backgroundColor: theme.colors.background.primary,
            },
          ]}
        >
          {/* Header Row */}
          <View style={styles.row}>
            {/* First cell: "Size" label */}
            <View
              style={[
                styles.headerCell,
                styles.firstColumn,
                {
                  backgroundColor: theme.colors.surface.sunken,
                  borderRightWidth: 1,
                  borderRightColor: theme.colors.border.default,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border.default,
                },
              ]}
            >
              <SushiText
                variant="body"
                customColor={theme.colors.text.primary}
                style={styles.headerText}
              >
                Size
              </SushiText>
            </View>

            {/* Size columns */}
            {sizeColumns.map((column, index) => (
              <View
                key={column.size}
                style={[
                  styles.headerCell,
                  {
                    backgroundColor: theme.colors.surface.sunken,
                    borderRightWidth: index < sizeColumns.length - 1 ? 1 : 0,
                    borderRightColor: theme.colors.border.default,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border.default,
                  },
                ]}
              >
                <SushiText
                  variant="body"
                  customColor={theme.colors.text.primary}
                  style={styles.headerText}
                  align="center"
                >
                  {column.size}
                </SushiText>
              </View>
            ))}
          </View>

          {/* Measurement Rows */}
          {rowLabels.map((label, rowIndex) => (
            <View key={label} style={styles.row}>
              {/* Row label */}
              <View
                style={[
                  styles.cell,
                  styles.firstColumn,
                  {
                    backgroundColor: theme.colors.surface.sunken,
                    borderRightWidth: 1,
                    borderRightColor: theme.colors.border.default,
                    borderBottomWidth: rowIndex < rowLabels.length - 1 ? 1 : 0,
                    borderBottomColor: theme.colors.border.default,
                  },
                ]}
              >
                <SushiText
                  variant="caption"
                  customColor={theme.colors.text.primary}
                  style={styles.rowLabelText}
                >
                  {label}
                </SushiText>
              </View>

              {/* Values for each size */}
              {sizeColumns.map((column, colIndex) => (
                <View
                  key={`${column.size}-${rowIndex}`}
                  style={[
                    styles.cell,
                    {
                      backgroundColor: theme.colors.background.primary,
                      borderRightWidth: colIndex < sizeColumns.length - 1 ? 1 : 0,
                      borderRightColor: theme.colors.border.default,
                      borderBottomWidth: rowIndex < rowLabels.length - 1 ? 1 : 0,
                      borderBottomColor: theme.colors.border.default,
                    },
                  ]}
                >
                  <SushiText
                    variant="caption"
                    customColor={theme.colors.text.secondary}
                    style={styles.valueText}
                    align="center"
                  >
                    {column.values[rowIndex]}
                  </SushiText>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer Note */}
      {footerNote && (
        <View style={styles.footerContainer}>
          <SushiText
            variant="caption"
            customColor={theme.colors.text.tertiary}
            style={styles.footerText}
          >
            {footerNote}
          </SushiText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContent: {
    paddingVertical: spacing.xs,
  },
  tableContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  headerCell: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstColumn: {
    minWidth: 100,
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
  },
  cell: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '700',
  },
  rowLabelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 12,
  },
  footerContainer: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  footerText: {
    fontSize: 10,
    fontStyle: 'italic',
  },
});

SizeGuideTable.displayName = 'SizeGuideTable';
