"use client";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserQuery } from "../../../utils/queryFunctions";
import { useQuery } from "@tanstack/react-query";
export default function SearchSkill() {
  const [hovers, setHovers] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [skill, setSkill] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => UserQuery(session),
  });
  const SubmitSkill = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`/api/skills/${skill}`, { method: "POST" });
      const response = await data.json();
      await fetch(`/api/auth/getUser/${userData.email}/updateLastRoadmap`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ skill: response.skillId }),
      });
      setIsLoading(false);
      router.push(`/roadmap/${response.skillId}`);
    } catch (e) {
      console.log("Skill Creation error", e);
    }
  };
  const Search = useCallback(async (query: string) => {
    try {
      const data = await fetch(`/api/skills/search/${query}`);
      const res = await data.json();
      const filteredResults = res.result.filter(
        (item: { Skill: string; id: number }) => {
          if (item.Skill !== query.trimEnd()) {
            return true;
          } else {
            return false;
          }
        },
      );
      setSearchResults(filteredResults);
    } catch (e) {
      console.log("Search Error:", e);
      return 0;
    }
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (skill.trim()) {
        Search(skill.trim());
      }
    }, 50); // debounce by 50ms

    return () => clearTimeout(delayDebounce);
  }, [skill, Search]);
  if (!isLoading)
    return (
      <div className="w-full  grow-1 flex items-center justify-center">
        <div className="w-[60%] flex flex-col justify-center items-center h-fit bg-[#EBEBEB] rounded-3xl">
          <h1 className="font-bold text-2xl w-full text-center pb-6 pt-8">
            WHAT DO YOU WANT TO LEARN TODAY?
          </h1>
          <div className="w-full flex justify-center items-start pb-6">
            <h3 className="font-semibold text-xl pr-2 h-12 justify-center items-center flex">
              I want to learn
            </h3>
            <div className="flex-col justify-center items-center">
              <input
                id="SkillInput"
                type="text"
                onFocus={() => {
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  if (!hovers) setShowSuggestions(false);
                }}
                className="p-2 rounded-2xl w-128 h-12 border-2 border-[#171A21]"
                value={skill}
                onChange={(e) => {
                  const value = e.target.value;
                  setSkill(value.toUpperCase());
                }}
              />
              {showSuggestions ? (
                <div
                  className="w-128 flex justify-center items-center absolute"
                  onMouseEnter={() => setHovers(true)}
                  onMouseLeave={() => setHovers(false)}
                >
                  <div className="flex-col justify-center items-center">
                    {searchResults.map((res: { id: number; Skill: string }) => {
                      return (
                        <div
                          key={res.id}
                          className="border-solid border-x-2 border-b-2 w-120 h-8 text-center flex justify-center content-box items-center font-semibold bg-[#EBEBEB] hover:bg-[#FF1F1F] hover:border-[#171A21] hover:text-[#EBEBEB]"
                          onClick={() => {
                            setSkill(res.Skill);
                            Search(res.Skill);
                            document.getElementById("SkillInput")?.focus();
                          }}
                        >
                          {res.Skill}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="pb-8">
            <button
              className="bg-[#FF1F1F] h-14 w-32 rounded-4xl text-xl py-1 px-2 text-[#EBEBEB] font-semibold"
              onClick={() => {
                SubmitSkill();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  else return <div>Creating Roadmap...</div>;
}
