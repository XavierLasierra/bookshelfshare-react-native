import React, {useState, useEffect} from 'react';
import {Snackbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {IStore} from '../../types/interfaces';

export default function Notification() {
  const [visible, setVisible] = useState(false);
  const notificationMessage = useSelector(
    (store: IStore) => store.notifications,
  );

  useEffect(() => {
    if (notificationMessage[0]) {
      setVisible(true);
    }
  }, [notificationMessage]);

  function onDismissSnackBar() {
    setVisible(false);
  }

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        testID: 'closeSnackbarButton',
        label: 'x',
        onPress: onDismissSnackBar,
      }}>
      {[notificationMessage]}
    </Snackbar>
  );
}
