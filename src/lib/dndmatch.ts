export const registDND = (
  onDrop: (props: { source: string; selectWord: string; dropIn: boolean; dropBoxNo:number; dragItemNo:number; word:string}) => void,
) => {
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

    // 드래그 가능한 아이템인지 확인
    if (!item.classList.contains('dnd-drag-item') || item.classList.contains('ghost')) return;

    // 드래그 시작
    const itemRect = item.getBoundingClientRect();
    const dropAreaList = document.querySelectorAll<HTMLElement>('.dnd-drop-area');

    // Ghost 만들기
    const ghostItem = item.cloneNode(true) as HTMLElement;
    // const ghostItemText = ghostItem.firstChild as HTMLHtmlElement;

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
    // ghostItemText.style.fontSize = `${getComputedStyle(itemText).fontSize}`;
    // ghostItemText.style.fontFamily = `${getComputedStyle(itemText).fontFamily}`;

    item.style.opacity = '0';
    item.style.cursor = 'grabbing';
    item.style.pointerEvents = 'none';
    document.body.style.cursor = 'grabbing';

    // 팝업용 분기 필요
    if (true) {
      const poparea = document.getElementById('dnd-wrapper') as HTMLHtmlElement;
      poparea.appendChild(ghostItem);
    }
    else
    document.body.appendChild(ghostItem);
    // Ghost 만들기 END

    const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
      if (moveEvent.cancelable) moveEvent.preventDefault();

      const poparea12 = document.getElementById('dnd-wrapper') as HTMLHtmlElement;
      const wrapperRect = poparea12.getBoundingClientRect();

      // Ghost Drag
      const { deltaX, deltaY } = getDelta(startEvent, moveEvent);

      /**
       * 상하단 경계 체크
       */
      if(itemRect.top + deltaY > wrapperRect.top) ghostItem.style.top = `calc(${itemRect.top + deltaY}px)`
      else ghostItem.style.top = `calc(${wrapperRect.top}px)`;
      if(deltaY + itemRect.bottom > wrapperRect.bottom)  ghostItem.style.top = `calc(${wrapperRect.bottom - itemRect.height}px)`

      if(itemRect.left + deltaX > wrapperRect.left) ghostItem.style.left = `calc(${itemRect.left + deltaX}px)`
      else ghostItem.style.left = `calc(${wrapperRect.left}px)`;
      if(deltaX + itemRect.right > wrapperRect.right) ghostItem.style.left = `calc(${wrapperRect.right - itemRect.width}px)`;

      // Drop 영역 확인
      const ghostItemRect = ghostItem.getBoundingClientRect();
      const ghostCenterX = ghostItemRect.left + ghostItemRect.width / 2;
      const ghostCenterY = ghostItemRect.top + ghostItemRect.height / 2;

      const dropArea = document.elementFromPoint(ghostCenterX, ghostCenterY)?.closest<HTMLElement>('.dnd-drop-area');

      dropAreaList.forEach((area) => {
        area.classList.remove('active');
        // area.removeAttribute('style');
      });

      if (dropArea) {
        dropArea.classList.add('active');
        // dropItem.style.filter = 'drop-shadow(16px 16px 16px gray)';
      }
    };

    const endHandler = () => {
      const activeDropArea = document.querySelector<HTMLElement>('.dnd-drop-area.active');
      // const lockInDropArea = document.querySelector<HTMLElement>('.dnd-drop-area.lock-in');
      const isLockIn = activeDropArea?.classList.contains('lock-in') || false;
      console.log("그냥두번?", isLockIn)
      // const isCorrect = item.innerText === dropItem?.innerText;

      // drop 영역 클래스명으로 넘버링체크
      // const isLockIn = activeDropArea ? true : false;
      // const suggestClassNm = dropItem ? dropItem.classList[0] : "dn0";
      // const classNo = suggestClassNm.slice(2);

      // 한번 정답에 락인 되면 변경 불가 KU5
      // const corrected = dropItem ? dropItem.classList[3] : "";

      // const examClassNm = item ? item.classList[0] : "dn0";
      // const dragNo = examClassNm.slice(2);
      // console.log("🚀 ~ file: DNDMatch.drag.ts:117 ~ endHandler ~ classNo22", dragNo)

      if (activeDropArea) {
        activeDropArea.classList.add('lock-in');

        // drop 영역으로 이동
        const dropItemRect = activeDropArea?.getBoundingClientRect();
        ghostItem.style.left = `${dropItemRect?.left}px`;
        ghostItem.style.top = `${dropItemRect?.top}px`;
        ghostItem.style.width = `${dropItemRect?.width}px`;
        ghostItem.style.height = `${dropItemRect?.height}px`;

        activeDropArea.innerText = ghostItem.innerHTML;

        if(isLockIn){
          const dragedItemNo = activeDropArea.ariaValueText;
          const droppedItem = document.querySelector<HTMLElement>(`.${dragedItemNo}.dnd-drag-item`);
          const droppedItemRect = droppedItem?.getBoundingClientRect();
          
          // 제자리 복귀
          ghostItem.style.top = `calc(${droppedItemRect?.top}px)`;
          ghostItem.style.left = `calc(${droppedItemRect?.left}px)`;
        }
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
          item.style.cursor = 'pointer';
          // item.removeAttribute('style');
          document.body.removeAttribute('style');
          
          // 이미 들어있는 단어 일 경우 이전 단어를 복원
          if(isLockIn){
            const dragedItemNo = activeDropArea!.ariaValueText;
            const droppedItem = document.querySelector<HTMLElement>(`.${dragedItemNo}.dnd-drag-item`);
            droppedItem!.style.opacity = '1';
            droppedItem!.style.pointerEvents = 'auto';
            
            ghostItem.innerHTML = droppedItem!.innerHTML;
          } 
          // 드롭 영역에 단어가 들어갔을 경우
          if(activeDropArea){
            activeDropArea.ariaValueText = item.classList[0];
          } else {
            item.style.pointerEvents = 'auto';
            item.style.opacity = '1';
          } 

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
          // const dropArea = document.querySelector<HTMLElement>('.dnd-drop-area');
          let makeWord = "";
          dropAreaList.forEach((area) => {
            makeWord += area.innerHTML;
            // area.classList.remove('active');
            // area.removeAttribute('style');
          });

          ghostItem.remove();
            onDrop({
            source: item.innerText,
            selectWord: item.ariaValueText ? item.ariaValueText : "",
            dropIn: activeDropArea ? true : false,
            dropBoxNo: Number(1),
            dragItemNo: Number(1),
            word: makeWord
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