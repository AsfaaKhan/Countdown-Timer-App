"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";


const Countdown_Timer = () => {

    // Backend Coding
    // Duration Input Manage 
    const [duration, setDuration] = useState<number | string>("")

    // Countdown Timer Value Manage 
    const [timeLeft, setTimeLeft] = useState<number>(0)

    // Timer Is Active Track
    const [isActive, setIsActive] = useState<boolean>(false)

    // Timer Is Paused Track
    const [isPaused, setIsPaused] = useState<boolean>(false)

    // Reference To store timer ID
    const timerRefer = useRef<NodeJS.Timeout | null>(null)


    // FUNCTIONS
    // setting the duration of the countdown 
    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration > 0) {
            setTimeLeft(duration);
            setIsActive(false)
            setIsPaused(false)

            // If Any Existing timer is set, Reset it
            if (timerRefer.current) {
                clearInterval(timerRefer.current);
            }
        }
    }

    // Start The Countdown Timer
    const handleStart = (): void => {
        if (timeLeft > 0) {
            setIsActive(true)
            setIsPaused(false)
        }
    }

    // Paused the Countdown Timer
    const handlePaused = (): void => {
        if (isActive) {
            setIsActive(false)
            setIsPaused(true)

            if (timerRefer.current) {
                clearInterval(timerRefer.current)
            }
        }
    }

    // Reset The Timer
    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number" ? duration : 0)

        if (timerRefer.current) {
            clearInterval(timerRefer.current);
        }
    };


    //  USE EFFECT OF HOOKS TO MANAGE THE COUNTDOWN INTERVAL
    useEffect(() => {
        if (isActive && !isPaused) {
            timerRefer.current = setInterval(() => {
                setTimeLeft((previousTime) => {
                        if (previousTime <= 1) {
                            clearInterval(timerRefer.current!)
                            return 0;
                        }
                        return previousTime - 1
                    });
                }, 1000);
            }
        
        return () => {
            if (timerRefer.current) {
                clearInterval(timerRefer.current);
            }
        };

    }, [isActive, isPaused]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    };

        //  TO HANDLE CHANGES IN THE DURATION INPUT FIELD 

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    }



    // Frontend Coding
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-100 dark:bg-slate-900  ">
            <div className="bg-slate-300 dark:bg-gray-800 shadow-2xl rounded-lg p-8 w-full max-w-md">
                <h1 className="text-center font-mono text-2xl font-bold mb-4 dark:text-gray-200 ">Countdown Timer</h1>

                {/* Input & Button Coding */}
                <div className=" flex items-center mb-6 ">
                    <Input
                        type="number"
                        id="duration"
                        placeholder="Enter duration in seconds: "
                        required
                        value={duration}
                        onChange={handleDurationChange}
                        className="flex-1  mr-4 rounded-md border outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:border-blue-500" />
                    <Button
                        onClick={handleSetDuration}
                        variant="outline"
                        className="text-gray-900 dark:text-gray-200 focus:border-blue-500 "
                    >
                        Set
                    </Button>
                </div>
                <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                    {formatTime(timeLeft) }
                </div>

                {/* Buttons (Start/Resume, Paused, Reset ) */}
                <div className="flex justify-center gap-4">

                    {/* Start/Resume Button */}
                    <Button
                        onClick={handleStart}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200 focus:border-blue-400">
                        {isPaused ? "Resume" : "Start" }
                    </Button>

                    {/* Paused Button */}
                    <Button
                        onClick={handlePaused}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200 focus:border-blue-400">
                        Paused
                    </Button>

                    {/* Reset Button */}
                    <Button
                        onClick={handleReset}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200 focus:border-blue-400" >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default Countdown_Timer