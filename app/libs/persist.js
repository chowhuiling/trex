import makeFinalStore from 'alt-utils/lib/makeFinalStore';

export default function(alt, storage, storeName) {
  const finalStore = makeFinalStore(alt);

  try {
    //alt.bootstrap => restore data to set state of all the stores.
    alt.bootstrap(storage.get(storeName));
  }
  catch(e) {
    console.error('Failed to bootstrap data', e);
  }

  finalStore.listen(() => {
    // to get clean state, set localStorage.setItem('debug', 'true'), then localStorage.clear()
    if (!storage.get('debug')) {
      storage.set(storeName, alt.takeSnapshot());
    }
  });
}
