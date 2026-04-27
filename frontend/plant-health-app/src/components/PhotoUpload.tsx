import styled from "styled-components";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  height: 44px;
  padding: 0.75em 1.4em;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.2s ease;
  color: #fff;
  background: linear-gradient(135deg, #4a9f79 0%, #2f7d5a 100%);
  box-shadow: 0 10px 25px rgba(20, 60, 40, 0.2);

  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(135deg, #4fa37d 0%, #31785f 100%);
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

interface Props {
  onUpload: (blob: Blob, url: string, name: string) => void;
}

export default function PhotoUpload({ onUpload }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(file, url, file.name);
    }
  };

  return (
    <UploadContainer>
      <HiddenInput
        type="file"
        accept="image/*"
        id="file-upload"
        onChange={handleFileChange}
      />
      <StyledLabel htmlFor="file-upload">📁 Upload a photo</StyledLabel>
    </UploadContainer>
  );
}
