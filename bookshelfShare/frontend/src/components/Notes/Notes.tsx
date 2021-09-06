import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './notes.styles';

export default function Notes({ list }: any) {
  const [notes, setNotes] = useState('');
  const [canNotes, setCanNotes] = useState(false);

  useEffect(() => {
    if (list.listId) {
      setNotes(list.notes);
      setCanNotes(true);
    } else {
      setNotes('Add book to a list/shelf to add notes');
    }
  }, [list]);

  return (
    <View>
      <Text style={styles.titleText}>Notes:</Text>
      <TextInput
        style={styles.notesInput}
        multiline
        maxLength={200}
        value={notes}
        editable={canNotes}
      />
    </View>
  );
}
