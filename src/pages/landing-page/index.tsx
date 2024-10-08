import * as React from "react";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "./components/AppAppBar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
// import LogoCollection from "./components/LogoCollection";
// import Highlights from "./components/Highlights";
// import Pricing from "./components/Pricing";
// import Features from "./components/Features";
// import Testimonials from "./components/Testimonials";
// import FAQ from "./components/FAQ";
// import Footer from "./components/Footer";
import getLPTheme from "./getLPTheme";
import { getProjects } from "../../api/project";
import { ProjectCard } from "./components/Projects";

// interface ToggleCustomThemeProps {
//   showCustomTheme: Boolean;
//   toggleCustomTheme: () => void;
// }

// function ToggleCustomTheme({
//   showCustomTheme,
//   toggleCustomTheme,
// }: ToggleCustomThemeProps) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "100dvw",
//         position: "fixed",
//         bottom: 24,
//       }}
//     >
//       <ToggleButtonGroup
//         color="primary"
//         exclusive
//         value={showCustomTheme}
//         onChange={toggleCustomTheme}
//         aria-label="Platform"
//         sx={{
//           backgroundColor: "background.default",
//           "& .Mui-selected": {
//             pointerEvents: "none",
//           },
//         }}
//       >
//         <ToggleButton value>
//           <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
//           Custom theme
//         </ToggleButton>
//         <ToggleButton value={false}>Material Design 2</ToggleButton>
//       </ToggleButtonGroup>
//     </Box>
//   );
// }

type ProjectResponse = {
  success: boolean;
  message: string;
  data: Array<ProjectCard>;
  errorCode?: string;
};

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [projects, setProjects] = React.useState<Array<ProjectCard>>([]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  //   const toggleCustomTheme = () => {
  //     setShowCustomTheme((prev) => !prev);
  //   };

  const loadProjects = async () => {
    const res: ProjectResponse = await getProjects();

    if (res.success) {
      setProjects(res.data);
    }
  };

  React.useEffect(() => {
    loadProjects();
  }, []);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Projects
        mode={mode}
        toggleColorMode={toggleColorMode}
        projects={projects}
        loadProjects={loadProjects}
      />
      <Box sx={{ bgcolor: "background.default" }}>
        {/* <LogoCollection /> */}
        {/* 
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer /> */}
      </Box>
      {/* <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      /> */}
    </ThemeProvider>
  );
}
