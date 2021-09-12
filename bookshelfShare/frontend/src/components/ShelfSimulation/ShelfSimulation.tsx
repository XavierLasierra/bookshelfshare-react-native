import React from 'react';
import { View } from 'react-native';
import ShelfBox from '../ShelfBox/ShelfBox';

import styles from './shelfSimulation.styles';

export default function ShelfSimulation({ shelfSize }: any) {
  function renderColumns(columns: number) {
    const renderedColumns = [];
    for (let i = 0; i < columns; i += 1) {
      renderedColumns.push(<ShelfBox width={`${100 / columns}%`} />);
    }
    return renderedColumns;
  }

  return (
    <>
      {shelfSize.map((columns: number) => (
        <View style={[styles.rowContainer, { height: `${100 / shelfSize.length}%`, width: '100%' }]}>
          {renderColumns(columns)}
        </View>
      ))}
    </>
  );
}
