import React from 'react';
import { View } from 'react-native';
import ShelfBox from '../ShelfBox/ShelfBox';

import styles from './shelfSimulation.styles';

export default function ShelfSimulation({ shelfSize }: any) {
  function calculateHeight() {
    const maxColumns: number = Math.max(...shelfSize);
    const rows: number = shelfSize.length;

    if (maxColumns > rows) return (rows / maxColumns) * 400;
    return 400;
  }

  function renderColumns(columns: number, index: number) {
    const renderedColumns = [];
    for (let i = 0; i < columns; i += 1) {
      renderedColumns.push(<ShelfBox key={`${index}-column-${i}`} width={`${100 / columns}%`} />);
    }
    return renderedColumns;
  }

  return (
    <View style={styles.shelfFlexContainer}>
      <View style={[styles.shelfOutsideOutline, { height: calculateHeight() }]}>
        {shelfSize.map((columns: number, index: number) => (
          <View
            style={[styles.rowContainer, { height: `${100 / shelfSize.length}%`, width: '100%' }]}
            // eslint-disable-next-line react/no-array-index-key
            key={`row-${index}`}
          >
            {renderColumns(columns, index)}
          </View>
        ))}
      </View>
    </View>
  );
}
