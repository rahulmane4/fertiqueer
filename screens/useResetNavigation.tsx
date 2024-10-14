import { CommonActions } from '@react-navigation/native';
import { useCallback } from 'react';

const useResetNavigation = (navigation) => {
  const resetNavigation = useCallback(
    (screenName) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: screenName }],
        })
      );
    },
    [navigation]
  );

  return resetNavigation;
};

export default useResetNavigation;
