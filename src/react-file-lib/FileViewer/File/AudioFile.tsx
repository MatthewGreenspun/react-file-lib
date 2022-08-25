import { DisplayFile } from "../../types";
import { useRef, useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SpeedIcon from "@mui/icons-material/Speed";
import IconButton from "@mui/material/IconButton";

const AudioSlider = styled(Slider)<{ minWidth?: string }>`
  margin: 0 4px;
  @media (max-width: 425px) {
    width: 100%;
    min-width: ${(props) => props.minWidth ?? "auto"};
    & .MuiSlider-thumb {
      width: 10px;
      height: 10px;
    }
  }
`;

const ControlBox = styled(Box)<{ smallRev?: boolean }>`
  @media (max-width: 425px) {
    flex-direction: ${(props) => (props.smallRev ? "row-reverse" : "row")};
  }
  display: flex;
  align-items: center;
  margin: 0 4px;
`;

interface Props {
  file: DisplayFile;
  nativeAudio: boolean;
}

const AudioFile: React.FC<Props> = ({ file, nativeAudio }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [volume, setVolume] = useState(100);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement?.addEventListener("timeupdate", (e) => {
      setCurrentTime(audioElement?.currentTime!);
    });
    return () => {
      audioElement?.pause();
      audioElement?.removeEventListener("timeupdate", (e) => {
        setCurrentTime(audioElement?.currentTime!);
      });
    };
  }, []);

  const formatTime = useCallback((timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds / 60) - 60 * hours;
    const seconds = Math.floor(timeInSeconds) - 60 * minutes;
    const n = (num: number) => (num < 10 ? `0${num}` : num.toString());
    if (hours) return `${n(hours)}:${n(minutes)}:${n(seconds)}`;
    return `${n(minutes)}:${n(seconds)}`;
  }, []);

  function handlePausePressed() {
    if (isPaused) audioRef.current?.play();
    else audioRef.current?.pause();
    setIsPaused(!isPaused);
  }

  function handleTimeChange(event: Event, newValue: number | number[]) {
    audioRef.current!.currentTime = newValue as number;
    setCurrentTime(newValue as number);
  }

  function handleVolumeChange(event: Event, newValue: number | number[]) {
    audioRef.current!.volume = (newValue as number) / 100;
    setVolume(newValue as number);
  }

  function handleSpeedChange() {
    const newSpeed = speed === 2 ? 0.25 : speed + 0.25;
    audioRef.current!.playbackRate = newSpeed;
    setSpeed(newSpeed);
  }

  if (nativeAudio)
    return (
      <audio controls src={file.fileData}>
        your browser does not support the audio element
      </audio>
    );

  return (
    <>
      <Box
        display="flex"
        sx={{ backgroundColor: "white" }}
        borderRadius="1rem"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        maxWidth="600px"
        width="100%"
        margin="auto"
        p={1}
      >
        <IconButton onClick={handlePausePressed}>
          {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
        </IconButton>
        <ControlBox flex={2} smallRev={true}>
          <Typography variant="body1" marginRight={2}>
            {formatTime(currentTime)}/
            {audioRef.current?.duration
              ? formatTime(audioRef.current?.duration!)
              : "00:00"}
          </Typography>
          <AudioSlider
            color="primary"
            aria-label="current time"
            value={currentTime}
            onChange={handleTimeChange}
            min={0}
            max={audioRef.current?.duration}
            minWidth="100px"
          />
        </ControlBox>
        <ControlBox flex={1}>
          <VolumeUpIcon sx={{ p: "8px", boxSizing: "content-box" }} />
          <AudioSlider
            color="primary"
            aria-label="volume"
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={100}
          />
        </ControlBox>
        <ControlBox>
          <SpeedIcon sx={{ margin: "0 0.2rem 0 1rem" }} />
          <IconButton
            onClick={handleSpeedChange}
            sx={{ fontSize: "1rem", height: "3rem", width: "3rem" }}
          >
            {speed}x
          </IconButton>
        </ControlBox>
      </Box>
      <audio ref={audioRef} src={file.fileData}></audio>
    </>
  );
};

export default AudioFile;
