import {
  AppBar,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import React, { useEffect } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useTranslation } from "react-i18next";

const EdemandSetting = ({
  changeLight,
  changeDark,
  setOpenSetting,
  view,
  setView,
}) => {
  const [lang, setlang] = React.useState("English");
  const { t, i18n, ready } = useTranslation();

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setlang(storedLang);
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setlang(i18n);
  };

  const handleCloseSetting = () => {
    setOpenSetting(false);
  };

  const handleChangeLanguage = (event) => {
    const selectedLang = event.target.value;
    if (!selectedLang) {
      selectedLang = "en"; // Set default language if no value is selected
    }
    setlang(selectedLang);
    localStorage.setItem("language", selectedLang);
    window.location.reload();
  };
  

  return (
    <div>
      <Box width="400px">
        <Box>
          {/* Heading  */}
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                // sx={{ mr: 2 }}
              >
                <SettingsOutlinedIcon />
              </IconButton>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {t("eDemand Setting")}
              </Typography>
              <IconButton onClick={handleCloseSetting} sx={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* Toggle Button for Modes  */}
          <Box justifyContent={"space-around"} display={"flex"} marginTop={3}>
            <ToggleButtonGroup value={view} exclusive onChange={(event, newValue) => setView(newValue)}>
              <ToggleButton
                onClick={changeLight}
                value="list"
                aria-label="list"
              >
                <Brightness7Icon /> {t("Light Theme")}
              </ToggleButton>
              <ToggleButton
                onClick={changeDark}
                value="module"
                aria-label="module"
              >
                <Brightness4Icon /> {t("Dark Theme")}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <br />
          <br />
          <Box
            display={"flex"}
            justifyContent={"center"}
            paddingLeft={6}
            paddingRight={6}
          >
            <FormControl sx={{ width: "280px" }}>
              <InputLabel>Select your language</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={lang}
                fullWidth
                placeholder="Select your language"
                input={<OutlinedInput label="Select Languages" />}
                label="Select"
                onChange={handleChangeLanguage}
                defaultValue={"en"}
              >
                <MenuItem
                  value={"en"}
                  onClick={() => {
                    changeLanguage("en");
                  }}
                >
                  English
                </MenuItem>
                <MenuItem value={"de"} onClick={() => changeLanguage("de")}>
                  German
                </MenuItem>
                <MenuItem value={"es"} onClick={() => changeLanguage("es")}>
                  Spanish
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EdemandSetting;
