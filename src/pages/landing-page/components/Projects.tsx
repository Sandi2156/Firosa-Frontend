import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// import MenuItem from "@mui/material/MenuItem";
// import Drawer from "@mui/material/Drawer";
// import MenuIcon from "@mui/icons-material/Menu";
// import ToggleColorMode from "./ToggleColorMode";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

// const logoStyle = {
//   width: "140px",
//   height: "auto",
//   cursor: "pointer",
// };

export interface ProjectCard {
  projectId: string;
  projectLink: string;
  projectName: string;
}

interface ProjectsProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  projects: Array<ProjectCard>;
}

function Projects(props: ProjectsProps) {
  const { projects } = props;

  return (
    <Box id="projects">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(3.5rem, 10vw, 4rem)",
            marginBottom: "80px",
          }}
        >
          Your&nbsp;
          <Typography
            component="span"
            variant="h1"
            sx={{
              fontSize: "clamp(3rem, 10vw, 4rem)",
              color: (theme) =>
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "primary.light",
            }}
          >
            projects
          </Typography>
        </Typography>

        <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Item>
            <Typography>siccy slider</Typography>

            <Stack direction="row" spacing={3}>
              <Button>Open</Button>
              {/* <Button>Delete</Button> */}
            </Stack>
          </Item>

          {projects.map((item) => (
            <Item>
              <Typography>{item.projectName}</Typography>

              <Stack direction="row" spacing={3}>
                <Button href={item.projectLink} target="_blank">
                  Open
                </Button>
                {/* <Button>Delete</Button> */}
              </Stack>
            </Item>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Projects;
