import { CommonActions, NavigationContainerRef } from '@react-navigation/native';
import { createRef, RefObject } from 'react';

let navigationRef = createRef<NavigationContainerRef | undefined>();

function init(ref: RefObject<NavigationContainerRef | undefined>) {
  navigationRef = ref;
}

function replace(name: string) {
  navigationRef.current?.dispatch(
    CommonActions.reset({ index: 0, routes: [{ name }] }),
  );
}

export default { replace, init };
