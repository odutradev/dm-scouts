import useSystemStore from "@stores/system";

export enum BorderRadius {
    none = "0rem",
    small = "0.25rem",
    medium = "0.5rem",
    large = "0.75rem",
    huge = "2rem",
    full = "31.25rem",
};

export enum LightColors {
    primary = "red"
};

export enum DarkColors {
    primary = "blue"
};

export enum Gradients {
    primary = "linear-gradient(90deg, #024FF0 0%, #0499C8 100%)"
};

export enum FontSize {
    tiny = "0.75rem",
    small = "0.875rem",
    medium = "1rem",
    large = "1.25rem",
    huge = "1.5rem",
    extraHuge = "2rem",
};

type Theme = {
    colors: Record<keyof typeof DarkColors, string> | Record<keyof typeof LightColors, string>,
    borderRadius: Record<keyof typeof BorderRadius, string>,
    gradients: Record<keyof typeof Gradients, string>,
    fontSize: Record<keyof typeof FontSize, string>,
};

let oldTheme: null | string; 
let currentTheme: Theme;

const updateTheme = () => {
    const storeTheme = useSystemStore.getState().system.theme;
    oldTheme = storeTheme;
    currentTheme = {
    colors: (storeTheme === "dark" || storeTheme === "default") ? DarkColors : LightColors,
    borderRadius: BorderRadius,
    gradients: Gradients,
    fontSize: FontSize,
  };
};

updateTheme();

useSystemStore.subscribe(
    (state) => {
        if (oldTheme != state.system.theme){
            oldTheme = state.system.theme
            updateTheme();
        }
    }
);

const getCurrentTheme = (): Theme => currentTheme;

export default getCurrentTheme;
