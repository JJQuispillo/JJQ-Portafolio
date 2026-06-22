import { Composition } from "remotion";
import { CodingBackground } from "./Main";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CodingBackground"
        component={CodingBackground}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
