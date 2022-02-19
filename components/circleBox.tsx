import { Stack } from "@mui/material";
interface CircleBoxProps {
  size: number;
}
const CircleBox: React.FC<CircleBoxProps> = ({ size, children }) => (
  <Stack style={{ borderRadius: "100%", height: size, width: size, backgroundColor: "#ccc" }}>{children}</Stack>
);

export default CircleBox;
