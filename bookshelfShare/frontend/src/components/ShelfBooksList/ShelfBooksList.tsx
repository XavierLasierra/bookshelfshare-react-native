import React from 'react';
import { FlatList, View } from 'react-native';
import ShelfBookElement from '../ShelfBookElement/ShelfBookElement';

export default function ShelfBooksList({ shelfData, logo, navigation }: any) {
  function renderListElement({ item: { customInformation: { location }, bookData } }: any) {
    return (
      <ShelfBookElement
        navigation={navigation}
        logo={logo}
        bookData={bookData}
        location={location}
            // eslint-disable-next-line no-underscore-dangle
        key={bookData._id}
        shelfName={shelfData.name}
      />
    );
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={shelfData.books}
        renderItem={renderListElement}
        keyExtractor={(item, index) => `shelf-${index}`}
      />
      <View style={{ height: 620 }} />
    </>
  );
}
