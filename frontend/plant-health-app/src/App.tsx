import { useState } from "react";
import styled from "styled-components";
import CameraView from "./components/CameraView";
import PhotoTaken from "./components/PhotoTaken";
import Diagnosis from "./components/Diagnosis";
import ButtonActions from "./components/ButtonActions";
import PhotoUpload from "./components/PhotoUpload";
import Button from "./components/Button";
import { createGlobalStyle } from "styled-components";
import SupportedPlants from "./components/SupportedPlants";
import type DiagnosisResult from "./types/DIagnosisResult";

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: #f6fbf6;
    background: radial-gradient(circle at top left, #b8f2b8 0%, #5e9f70 40%, #113b16 100%);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background: transparent;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  button,
  input {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 16px;
`;

const ContentCard = styled.div`
  width: min(100%, 960px);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 30px;
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 80px rgba(12, 43, 16, 0.35);
  padding: 36px 30px 42px;
  color: #f7fbf7;
  text-align: center;
`;

const Header = styled.header`
  max-width: 760px;
  margin: 0 auto 2rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  letter-spacing: -0.05em;
  text-transform: uppercase;
  font-weight: 800;
`;

const Subtitle = styled.p`
  margin: 1rem auto 0;
  max-width: 680px;
  color: rgba(246, 251, 246, 0.82);
  font-size: 1rem;
  line-height: 1.7;
`;

const FlashOverlay = styled.div<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  opacity: ${({ active }) => (active ? 0.7 : 0)};
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 999;
`;

const CameraToggle = styled.div`
  margin-bottom: 1rem;
`;

const StyledParagraph = styled.p`
  margin-top: 15px;
  margin-bottom: 0;
  color: rgba(246, 251, 246, 0.82);
  font-size: 0.95rem;
  letter-spacing: 0.01em;
`;

const FileDetails = styled.div`
  margin-top: 1rem;
  color: rgba(246, 251, 246, 0.82);
  font-size: 0.96rem;
  font-weight: 500;
`;

function App() {
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [flash, setFlash] = useState(false);

  const setPhoto = (
    blob: Blob | null,
    url: string | null,
    name: string | null,
  ) => {
    setPhotoBlob(blob);
    setPhotoURL(url);
    setPhotoName(name);
  };

  const resetPhoto = () => {
    setPhoto(null, null, null);
    setDiagnosis(null);
    setCameraActive(false);
  };

  const onCapture = (blob: Blob, url: string) => {
    setPhoto(blob, url, "Captured photo");
    flashEffect();
  };

  const onUpload = (blob: Blob, url: string, name: string) => {
    setPhoto(blob, url, name);
  };

  const flashEffect = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 250);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ContentCard>
          <Header>
            <Title>Plant Health Diagnoser</Title>
            <Subtitle>
              Upload a plant photo or capture one with your camera
            </Subtitle>
          </Header>

          <SupportedPlants />
          <FlashOverlay active={flash} />

          {photoURL ? (
            <>
              <PhotoTaken photoURL={photoURL} />
              {photoName && <FileDetails>File: {photoName}</FileDetails>}
              <ButtonActions
                photoBlob={photoBlob}
                diagnosisLoading={diagnosisLoading}
                setDiagnosis={setDiagnosis}
                resetPhoto={resetPhoto}
                setDiagnosisLoading={setDiagnosisLoading}
                diagnosis={diagnosis}
              />
              {diagnosis && <Diagnosis diagnosis={diagnosis} />}
            </>
          ) : (
            <>
              {cameraActive ? (
                <>
                  <CameraToggle>
                    <Button
                      onClick={() => setCameraActive(false)}
                      variant="secondary"
                    >
                      ✋ Deactivate Camera
                    </Button>
                  </CameraToggle>
                  <CameraView photoURL={photoURL} onCapture={onCapture} />
                </>
              ) : (
                <CameraToggle>
                  <Button
                    onClick={() => setCameraActive(true)}
                    variant="activateCamera"
                  >
                    📷 Activate Camera
                  </Button>
                </CameraToggle>
              )}
              <StyledParagraph>
                or upload a photo from your device
              </StyledParagraph>
              <PhotoUpload onUpload={onUpload} />
            </>
          )}
        </ContentCard>
      </AppContainer>
    </>
  );
}

export default App;
