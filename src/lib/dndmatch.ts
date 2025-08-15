export const registDND = (
  onDrop: (props: { source: string; selectWord: string; dropIn: boolean; dropBoxNo:number; dragItemNo:number}) => void,
) => {
  // const isTouchScreen =
  //   typeof window !== 'undefined' &&
  //   window.matchMedia('(hover: none) and (pointer: coarse)').matches;
// if (window.ontouchstart !== undefined) {
//   alert()
// }
//   const isTouchScreen = /Mobi|Phone|iPad|iPod|Android/i.test(window.navigator.userAgent);
  const isTouchScreen = window.ontouchstart !== undefined;

  const startEventName = isTouchScreen ? 'touchstart' : 'mousedown';
  const moveEventName = isTouchScreen ? 'touchmove' : 'mousemove';
  const endEventName = isTouchScreen ? 'touchend' : 'mouseup';

  const getDelta = (startEvent: MouseEvent | TouchEvent, moveEvent: MouseEvent | TouchEvent) => {
    if (isTouchScreen) {
      const se = startEvent as TouchEvent;
      const me = moveEvent as TouchEvent;

      return {
        deltaX: me.touches[0].pageX - se.touches[0].pageX,
        deltaY: me.touches[0].pageY - se.touches[0].pageY,
      };
    }

    const se = startEvent as MouseEvent;
    const me = moveEvent as MouseEvent;

    return {
      deltaX: me.pageX - se.pageX,
      deltaY: me.pageY - se.pageY,
    };
  };

  const startHandler = (startEvent: MouseEvent | TouchEvent) => {
    const item = startEvent.target as HTMLElement;
    const itemText = item.firstChild as HTMLElement;
    // console.log("🚀 ~ file: DNDMatch.drag.ts:33 ~ startHandler ~ startEvent:", item, itemText)
    
    if (
      !item.classList.contains('dnd-drag-item') ||
      item.classList.contains('ghost') ||
      item.classList.contains('placeholder')
    ) {
      return;
    }

    const itemRect = item.getBoundingClientRect();
    const dropAreaList = document.querySelectorAll<HTMLElement>('.dnd-drop-area');

    // Ghost 만들기
    const ghostItem = item.cloneNode(true) as HTMLElement;
    const ghostItemText = ghostItem.firstChild as HTMLHtmlElement;
    // console.log("스타뜨", getComputedStyle(item).padding)

    ghostItem.classList.add('ghost');
    ghostItem.style.position = 'fixed';
    ghostItem.style.top = `calc(${itemRect.top}px)`;
    ghostItem.style.left = `calc(${itemRect.left}px)`;
    ghostItem.style.pointerEvents = 'none';
    ghostItem.style.textShadow = '0 30px 60px rgba(0, 0, 0, .2)';
    ghostItem.style.transform = 'scale(1)';
    ghostItem.style.transition = 'transform 200ms ease';

    ghostItem.style.width = `${getComputedStyle(item).width}`;
    ghostItem.style.height = `${getComputedStyle(item).height}`;
    ghostItem.style.padding = `${getComputedStyle(item).padding}`;
    ghostItemText.style.fontSize = `${getComputedStyle(itemText).fontSize}`;
    ghostItemText.style.fontFamily = `${getComputedStyle(itemText).fontFamily}`;

    item.classList.add('placeholder');
    item.style.opacity = '0';
    item.style.cursor = 'grabbing';
    document.body.style.cursor = 'grabbing';

    document.body.appendChild(ghostItem);
    // Ghost 만들기 END

    const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
      // console.log("무브 !")
      if (moveEvent.cancelable) moveEvent.preventDefault();

      // Ghost Drag
      const { deltaX, deltaY } = getDelta(startEvent, moveEvent);

      ghostItem.style.top = `calc(${itemRect.top + deltaY}px)`;
      ghostItem.style.left = `calc(${itemRect.left + deltaX}px)`;

      // Drop 영역 확인
      const ghostItemRect = ghostItem.getBoundingClientRect();
      const ghostCenterX = ghostItemRect.left + ghostItemRect.width / 2;
      const ghostCenterY = ghostItemRect.top + ghostItemRect.height / 2;

      const dropItem = document
        .elementFromPoint(ghostCenterX, ghostCenterY)
        ?.closest<HTMLElement>('.dnd-drop-area');

      dropAreaList.forEach((area) => {
        area.classList.remove('active');
        // area.removeAttribute('style');
      });

      if (dropItem) {
        dropItem.classList.add('active');
        // dropItem.style.filter = 'drop-shadow(16px 16px 16px gray)';
      }
    };

    const endHandler = () => {
      const dropItem = document.querySelector<HTMLElement>('.dnd-drop-area.active');
      // const isCorrect = item.innerText === dropItem?.innerText;

      // drop 영역 클래스명으로 넘버링체크
      const isLockIn = dropItem ? true : false;
      const suggestClassNm = dropItem ? dropItem.classList[2] : "dn0";
      const classNo = suggestClassNm.slice(2);

      // 한번 정답에 락인 되면 변경 불가 KU5
      const corrected = dropItem ? dropItem.classList[3] : "";

      const examClassNm = item ? item.classList[2] : "dn0";
      const dragNo = examClassNm.slice(2);
      // console.log("🚀 ~ file: DNDMatch.drag.ts:117 ~ endHandler ~ classNo22", dragNo)
      
      if (isLockIn && corrected != "corrected") {
        // drop 영역으로 이동
        const dropItemRect = dropItem?.getBoundingClientRect();
        ghostItem.style.left = `${dropItemRect?.left}px`;
        ghostItem.style.top = `${dropItemRect?.top}px`;
        ghostItem.style.width = `${dropItemRect?.width}px`;
        ghostItem.style.height = `${dropItemRect?.height}px`;
        // if(dropItem) dropItem.innerText = "";
      } else {
        // 제자리 복귀
        ghostItem.style.top = `calc(${itemRect.top}px)`;
        ghostItem.style.left = `calc(${itemRect.left}px)`;
      }

      ghostItem.style.transition = 'all 200ms ease';
      ghostItem.style.transform = 'none';
      ghostItem.addEventListener(
        'transitionend',
        () => {
          item.classList.remove('placeholder');
          item.style.cursor = 'pointer';
          // item.removeAttribute('style');
          document.body.removeAttribute('style');

          // 빈칸에 못들어 갔을시 다시 표시
          if(!isLockIn || corrected == "corrected") item.style.opacity = '1';


          // if (dropItem) {
          //   dropItem.classList.remove('active');
          //   dropItem.removeAttribute('style');

          //   if (!isLockIn) {
          //     item.classList.add('shake');
          //     item.addEventListener(
          //       'animationend',
          //       () => {
          //         item.classList.remove('shake');
          //       },
          //       { once: true },
          //     );
          //   } else {
          //     item.classList.add('opacity-50');
          //     dropItem.classList.remove('text-white');
          //     dropItem.classList.add('text-stone-700');
          //   }
          // }
          
          ghostItem.remove();
          onDrop({
            source: item.innerText,
            selectWord: item.ariaValueText ? item.ariaValueText : "",
            dropIn: isLockIn && corrected != "corrected" ? true : false,
            dropBoxNo: Number(classNo),
            dragItemNo: Number(dragNo)
          });
        },
        { once: true },
      );
      document.removeEventListener(moveEventName, moveHandler);
    };

    document.addEventListener(moveEventName, moveHandler, { passive: false });
    document.addEventListener(endEventName, endHandler, { once: true });
  };

  document.addEventListener(startEventName, startHandler);
  return () => document.removeEventListener(startEventName, startHandler);
};