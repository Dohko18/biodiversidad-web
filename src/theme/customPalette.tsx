import {PaletteColorOptions} from '@mui/material';
import {createTheme} from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface PaletteOptions {
        table?: {
            selectedRow?: PaletteColorOptions;
            borderRow?: PaletteColorOptions;
        };
        border: PaletteColorOptions;
    }

    // add inside theme
    interface ThemeOptions {
    }
}

// extend typography inside the theme
declare module '@mui/material/styles/createTypography' {
    interface FontStyle {
        font1: string;
    }
}

const defaultComponents = {
    MuiSelect: {
        defaultProps: {}
    },
    MuiInput: {
        defaultProps: {
            size: "small"
        }
    },
    MuiList: {
        defaultProps: {
            dense: true
        }
    },
    MuiTable: {
        defaultProps: {
            size: "small"
        }
    },
    MuiTextField: {
        defaultProps: {
            variant: "outlined"
        },
    },
    MuiButton: {
        defaultProps: {
            variant: "outlined"
        }
    },
    MuiDivider: {
        defaultProps: {
            sx: {paddingTop: 0.5, paddingBottom: 0.5}
        }
    }
}

export const darkTheme = createTheme({

    components: {
        ...defaultComponents as any
    },
    typography: {
        fontFamily: [
            'Helvetica Neue',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        mode: 'dark',
        border: {
            main: '#252423'
        },
        primary: {
            main: '#f5bc12',
            light: 'rgba(245,188,18,0.55)',
        },
        secondary: {
            main: '#ffca2d',
        },
        table: {
            selectedRow: {
                main: '#292827'
            },
            borderRow: {
                main: '#252423'
            },
        },
        background: {
            default: "#1b1a19",
            paper: '#292929'
        }
    },
});

export const lightTheme = createTheme({
    components: {
        ...defaultComponents as any
    },
    typography: {
        fontFamily: [
            'Helvetica Neue',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#f5bc12',
            light: 'rgba(245,188,18,0.55)',
        },
        background: {
            default: "#faf9f4",
            paper: '#fcfae1'
        },
        border: {
            main: '#ffca2d'
        },
        secondary: {
            main: '#ffca2d',
        },
        table: {
            selectedRow: {
                main: '#f3f2f1'
            },
            borderRow: {
                main: '#f3f3f3'
            },
        }
    },
});

