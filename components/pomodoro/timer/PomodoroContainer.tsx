"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pathsToSoundEffects } from "@/lib/utils";
import { PomodoroSettings } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Howl } from "howler";
import { Button } from "@/components/ui/button";
import { SkipForward } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  pomodoroSettings: PomodoroSettings;
}

export const PomodoContainer = ({
  pomodoroSettings: {
    longBreakDuration,
    longBreakInterval,
    rounds,
    shortBreakDuration,
    workDuration,
    soundEffect,
    soundEffectVolume,
  },
}: Props) => {
  const [timer, setTimer] = useState({ minutes: workDuration, seconds: 0 });
  const [isTimerRunning, setIsTimmerRunning] = useState(false);
  const [completedIntervals, setCompletedIntervals] = useState(1);

  const [isBreakTime, setIsBreakTime] = useState(false);
  const [currentRounds, setCurrentRounds] = useState(1);

  const handleTimer = useCallback(() => {
    setIsTimmerRunning(false);

    if (isBreakTime) {
      setTimer({ minutes: workDuration, seconds: 0 });
      setIsBreakTime(false);
      setCurrentRounds((prev) => prev + 1);
      setCompletedIntervals((prev) => prev + 1);
    } else {
      setIsBreakTime(true);
      if (completedIntervals === longBreakInterval) {
        setTimer({ minutes: longBreakDuration, seconds: 0 });
        setCompletedIntervals(1);
      } else {
        setTimer({ minutes: shortBreakDuration, seconds: 0 });
      }
    }

    const currentPath = pathsToSoundEffects[soundEffect];

    const sound = new Howl({
      src: currentPath,
      html5: true,
      volume: soundEffectVolume,
    });

    sound.play();
  }, [
    isBreakTime,
    completedIntervals,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    workDuration,
    soundEffect,
    soundEffectVolume,
  ]);

  const t = useTranslations("POMODORO.TIMER");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning && currentRounds <= rounds) {
      interval = setInterval(() => {
        if (timer.minutes === 0 && timer.seconds === 0) {
          clearInterval(interval);
          handleTimer();
        } else {
          if (timer.seconds === 0) {
            setTimer((prev) => {
              return {
                ...prev,
                minutes: prev.minutes - 1,
              };
            });
            setTimer((prev) => {
              return {
                ...prev,
                seconds: 59,
              };
            });
          } else {
            setTimer((prev) => {
              return {
                ...prev,
                seconds: prev.seconds - 1,
              };
            });
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    isTimerRunning,
    timer,
    isBreakTime,
    currentRounds,
    completedIntervals,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    workDuration,
    handleTimer,
    rounds,
  ]);

  const formattedMinutes = useMemo(
    () => (timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes),
    [timer.minutes]
  );

  const formattedSeconds = useMemo(
    () => (timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds),
    [timer.seconds]
  );

  const progress = useMemo(() => {
    const totalDuration = isBreakTime 
      ? (completedIntervals === longBreakInterval ? longBreakDuration : shortBreakDuration)
      : workDuration;
    const currentTime = timer.minutes + timer.seconds / 60;
    return Math.max(0, Math.min(1, 1 - (currentTime / totalDuration)));
  }, [timer.minutes, timer.seconds, isBreakTime, completedIntervals, longBreakInterval, longBreakDuration, shortBreakDuration, workDuration]);

  const resetPomodoro = useCallback(() => {
    setTimer({ minutes: workDuration, seconds: 0 });
    setIsBreakTime(false);
    setCurrentRounds(1);
    setCompletedIntervals(1);
  }, [workDuration]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Pomodoro Timer</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Stay focused and productive with the Pomodoro technique
        </p>
      </div>

      {/* Main Timer Card */}
      <Card className="border shadow-xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          {/* Timer Display */}
          <div className="space-y-6">
            {/* Circular Progress */}
            <div className="relative mx-auto w-80 h-80 flex items-center justify-center">
              {/* Background Circle */}
              <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-muted/20"
                />
                {/* Progress Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  className={`${isBreakTime ? "text-green-500" : "text-primary"} transition-all duration-1000`}
                  style={{
                    strokeDasharray: `${2 * Math.PI * 45}`,
                    strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress)}`,
                  }}
                />
              </svg>
              
              {/* Timer Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {currentRounds <= rounds ? (
                  <>
                    <div className="text-6xl md:text-7xl font-bold text-foreground font-mono">
                      {formattedMinutes}:{formattedSeconds}
                    </div>
                    <div className={`text-xl font-semibold mt-2 ${
                      isBreakTime ? "text-green-600" : "text-primary"
                    }`}>
                      {isBreakTime ? t("BREAK") : t("FOCUS")}
                    </div>
                  </>
                ) : (
                  <div className="text-4xl font-bold text-primary">
                    {t("END_TEXT")}
                  </div>
                )}
              </div>
            </div>

            {/* Round Counter */}
            {currentRounds <= rounds && (
              <div className="flex items-center justify-center gap-2 text-lg">
                <span className="text-muted-foreground">{t("ROUNDS.FIRST")}</span>
                <span className="font-bold text-primary text-xl">{currentRounds}</span>
                <span className="text-muted-foreground">{t("ROUNDS.SECOND")}</span>
                <span className="font-bold text-foreground text-xl">{rounds}</span>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pt-4">
              {currentRounds <= rounds ? (
                <>
                  <Button
                    onClick={() => setIsTimmerRunning((prev) => !prev)}
                    size="lg"
                    className={`px-8 py-4 text-lg font-semibold transition-all duration-200 ${
                      isTimerRunning
                        ? "bg-destructive hover:bg-destructive/90 text-white"
                        : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Pause
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Start
                      </>
                    )}
                  </Button>
                  
                  {isTimerRunning && (
                    <Button
                      onClick={handleTimer}
                      variant="outline"
                      size="lg"
                      className="px-6 py-4 border-primary/30 hover:bg-primary/10 hover:border-primary"
                    >
                      <SkipForward className="w-5 h-5 mr-2" />
                      Skip
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  onClick={resetPomodoro}
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t("NEW")}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
