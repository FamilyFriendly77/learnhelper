"use client";
import {
  ArrowRight,
  Book,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FileText,
  FileVideo,
  Globe,
} from "lucide-react";
import { RoadmapItemType } from "../(ShowDataAndTypes)/RoadmapTypes";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  Item: RoadmapItemType;
  id: { index: number; id: string };
  progress: boolean;
  onCheck: (index: number) => void;
};

export default function RoadmapItem({ Item, id, progress, onCheck }: Props) {
  const [xChange, setXChange] = useState(-50);
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const handleCheck = () => {
    onCheck(id.index);
    return 0;
  };
  return (
    <div className="relative h-fit w-full flex flex-row">
      <div
        className="w-full h-fit text-wrap flex flex-row gap-16 justify-start pl-4 items-center"
        id={id.id}
      >
        <div className="flex flex-row justify-start w-fit h-fit items-center gap-4">
          <button onClick={() => handleCheck()}>
            <CircleCheck size={48} fill={progress ? "#0CAC64" : "#EBEBEB"} />
          </button>
          <div className="flex-col w-fit border-2 p-4 mb-2 mt-2 max-w-240 rounded-xl pl-8 pr-8">
            <div className="flex flex-col gap-2 justify-start items-start">
              <h1 className="text-3xl font-bold text-nowrap w-fit">
                {Item.content}
              </h1>
              <p className="text-lg text-wrap">{Item.description}</p>
            </div>
            {Item.references?.length ? (
              <>
                <button
                  onClick={() => setIsUnwrapped(!isUnwrapped)}
                  className="flex flex-row gap-1 hover:animate-bounce p-0.5 border-transparent border-b-1 hover:border-[#171A21] items-center justify-center transition-all delay-100 duration-500 "
                >
                  <span className="text-lg ">See more</span>
                  <ChevronDown
                    size={20}
                    className={`transition-all ${isUnwrapped ? "" : "-rotate-90"}`}
                  />
                </button>
                {isUnwrapped ? (
                  <div className="pt-4">
                    <p className="pb-2">References:</p>
                    <div className="flex flex-col justify-center gap-2 items-start">
                      {Item.references?.map((reference, i) => {
                        let icon = null;
                        switch (reference.type) {
                          case "video":
                            icon = <FileVideo size={24} />;
                            break;
                          case "article":
                            icon = <FileText size={24} />;
                            break;
                          case "website":
                            icon = <Globe size={24} />;
                          case "book":
                            icon = <Book size={24} />;
                            break;
                          default:
                            icon = <Globe size={24} />;
                        }
                        return (
                          <button
                            className="flex flex-col border-transparent border-b-1 hover:border-[#171A21] p-1 transition-all delay-100 duration-200"
                            key={`Reference_${i}`}
                          >
                            <div
                              className="flex flex-row gap-2 justify-center items-center"
                              onClick={() =>
                                window.open(
                                  Item.references?.at(i)?.url,
                                  "_blank",
                                )
                              }
                            >
                              {icon}
                              <h3 className="font-semibold">
                                {Item.references?.at(i)?.title}
                              </h3>
                              <ArrowRight size={24} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {Item.quickTips ? (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[120%] w-80 h-60 bg-gradient-to-tr from-[#00A1E0] to-[#0CAC64] flex rounded-lg justify-center items-center shadow-lg">
          <div className="w-[310px] h-[230px] bg-[#EBEBEB] rounded-sm flex flex-col justify-between items-center">
            <h1 className="w-full text-center p-2 text-2xl font-bold bg-gradient-to-r from-[#00A1E0] to-[#0CAC64] bg-clip-text text-transparent">
              Quick Tip
            </h1>
            <div className="flex flex-row justify-center items-center px-1 text-center">
              <button
                onClick={() => {
                  setXChange(-50);
                  return Item.quickTips && tipIndex > 0
                    ? setTipIndex(tipIndex - 1)
                    : null;
                }}
              >
                <ChevronLeft size={26} />
              </button>

              <div className=" text-center w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={tipIndex}
                    initial={{ x: xChange, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: xChange, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-fit h-fit"
                  >
                    {Item.quickTips[tipIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <button
                onClick={() => {
                  setXChange(50);
                  return Item.quickTips && tipIndex < Item.quickTips.length - 1
                    ? setTipIndex(tipIndex + 1)
                    : null;
                }}
              >
                <ChevronRight size={26} />
              </button>
            </div>

            <div className="flex flex-row justify-center items-center gap-1 pb-4">
              {/* Dots  */}
              {Item.quickTips.map((_, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-tr from-[#00A1E0] to-[#0CAC64] rounded-full ${
                    tipIndex === i ? "size-2.5" : "size-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
