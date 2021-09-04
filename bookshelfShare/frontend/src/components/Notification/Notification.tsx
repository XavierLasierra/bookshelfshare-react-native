import React, { useState, useEffect } from 'react';

import { Snackbar } from 'react-native-paper';
import { useSelector } from 'react-redux';

const MyComponent = () => {
  const [visible, setVisible] = useState(false);
  const notificationMessage = useSelector((store: any) => store.notifications);

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
        label: 'x',
        onPress: onDismissSnackBar
      }}
    >
      {[notificationMessage]}
    </Snackbar>
  );
};

export default MyComponent;
