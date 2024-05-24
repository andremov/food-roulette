import clsx from "clsx";
import {
  ArrowBigLeft,
  ArrowBigRight,
  BeanIcon,
  BeefIcon,
  DrumstickIcon,
  FishIcon,
  PizzaIcon,
  SaladIcon,
  SandwichIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

type RouletteSlotType = {
  name: string;
  bgColor: string;
  textColor: string;
  icon: JSX.Element;
};

const slots: RouletteSlotType[] = [
  {
    name: "Mexican",
    icon: <BeanIcon width={35} height={50} />,
    bgColor: "bg-lime-500",
    textColor: "text-white",
  },
  {
    name: "Seafood",
    icon: <FishIcon width={35} height={50} />,
    bgColor: "bg-cyan-500",
    textColor: "text-white",
  },
  {
    name: "Bowl",
    icon: <SaladIcon width={35} height={50} />,
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    name: "Sandwich",
    icon: <SandwichIcon width={35} height={50} />,
    bgColor: "bg-violet-500",
    textColor: "text-white",
  },
  {
    name: "Steak",
    icon: <BeefIcon width={35} height={50} />,
    bgColor: "bg-rose-500",
    textColor: "text-white",
  },
  {
    name: "Pizza",
    icon: <PizzaIcon width={35} height={50} />,
    bgColor: "bg-red-500",
    textColor: "text-white",
  },
  {
    name: "Chicken",
    icon: <DrumstickIcon width={35} height={50} />,
    bgColor: "bg-amber-500",
    textColor: "text-white",
  },
];

const rouletteSlotSize = 178;
const rouletteOptionsSize = slots.length * rouletteSlotSize;

type RouletteStateType = {
  animatedPosition: number;
  innerSpins: number;
  targetPosition: number;
  currentHighlightedSlot: number;
};

function rouletteTick(curState: RouletteStateType) {
  if (curState.animatedPosition >= curState.targetPosition) {
    return { ...curState, animatedPosition: curState.targetPosition };
  }

  const animatedInnerSpins = Math.floor(
    curState.animatedPosition / rouletteOptionsSize,
  );

  const delta = curState.targetPosition - curState.animatedPosition;
  let speed = 10;

  if (3400 <= delta) {
    speed = 200;
  } else if (1400 <= delta && delta < 3400) {
    const coeff = (delta - 1400) / 2000;
    speed = 50 + coeff * 150;
  } else if (600 < delta && delta < 1400) {
    speed = 50;
  } else if (delta < 600) {
    const coeff = delta / 600;
    speed = 2 + coeff * 48;
  }

  if (curState.animatedPosition + speed >= curState.targetPosition) {
    return { ...curState, animatedPosition: curState.targetPosition };
  }

  return {
    ...curState,
    animatedPosition: curState.animatedPosition + speed,
    innerSpins:
      animatedInnerSpins > curState.innerSpins
        ? curState.innerSpins + 1
        : curState.innerSpins,
    currentHighlightedSlot: Math.floor(
      ((curState.animatedPosition + 200) % rouletteOptionsSize) /
        rouletteSlotSize,
    ),
  };
}

export function Roulette() {
  const [
    { animatedPosition, innerSpins, targetPosition, currentHighlightedSlot },
    setRouletteState,
  ] = useState({
    animatedPosition: 0,
    innerSpins: 0,
    targetPosition: 0,
    currentHighlightedSlot: 1,
  });

  useEffect(() => {
    const interval = setInterval(() => setRouletteState(rouletteTick), 100);

    return () => clearInterval(interval);
  }, []);

  function randomizeTarget() {
    if (animatedPosition === targetPosition) {
      setRouletteState((curState) => ({
        ...curState,
        targetPosition:
          curState.targetPosition + Math.floor(Math.random() * 5000 + 5000),
      }));
    }
  }

  return (
    <div
      className={clsx([
        "relative h-[25rem] select-none overflow-hidden border-2 border-white bg-black",
        {
          "cursor-pointer transition active:scale-90 md:hover:scale-110":
            animatedPosition === targetPosition,
          "scale-90": animatedPosition !== targetPosition,
        },
      ])}
      onClick={randomizeTarget}
    >
      <div
        className="transition ease-linear"
        style={{
          transitionDuration: "100ms",
          transform: `translateY(-${animatedPosition}px)`,
        }}
      >
        <div
          style={{
            transform: `translateY(${innerSpins * rouletteOptionsSize}px)`,
          }}
        >
          <RouletteItems
            currentHighlightedSlot={currentHighlightedSlot}
            finishedSpinning={
              targetPosition !== 0 && targetPosition === animatedPosition
            }
          />
          <RouletteItems
            currentHighlightedSlot={currentHighlightedSlot}
            finishedSpinning={
              targetPosition !== 0 && targetPosition === animatedPosition
            }
          />
          <RouletteItems
            currentHighlightedSlot={currentHighlightedSlot}
            finishedSpinning={
              targetPosition !== 0 && targetPosition === animatedPosition
            }
          />
        </div>
      </div>

      <div className="absolute left-[-8%] top-[40%] flex w-[116%] justify-between">
        <ArrowBigRight className="fill-white" width={50} height={50} />
        <div className="absolute top-[48.5%] w-full border border-white opacity-80"></div>
        <ArrowBigLeft className="fill-white" width={50} height={50} />
      </div>
    </div>
  );
}

function RouletteItems({
  currentHighlightedSlot,
  finishedSpinning,
}: {
  currentHighlightedSlot: number;
  finishedSpinning: boolean;
}) {
  return slots.map((item, idx) => (
    <div
      className={clsx([
        `flex flex-col items-center justify-center px-24 py-12 ${item.bgColor} ${item.textColor}`,
        {
          "opacity-40": currentHighlightedSlot !== idx,
        },
      ])}
      key={idx}
    >
      <div
        className={clsx([
          "flex flex-col items-center justify-center",
          {
            "animate-wiggle":
              finishedSpinning && currentHighlightedSlot === idx,
          },
        ])}
      >
        {item.icon}
        <span className="text-2xl font-bold">{item.name}</span>
      </div>
    </div>
  ));
}
