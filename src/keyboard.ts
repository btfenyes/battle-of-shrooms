export default function keyboard (value: number | string) {
  let key = {
    value: value, 
    isDown: false, 
    isUp: true,
    press: () => {},
    release: () => {},
    downHandler: (event: any) => {
      if (event.key === key.value || event.keyCode === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    },
    upHandler: (event: any) => {
      if (event.key === key.value || event.keyCode === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    },
    unsubscribe: () => {}
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}