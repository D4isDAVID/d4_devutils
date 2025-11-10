/** biome-ignore-all lint/style/useNamingConvention: this is how cfx declares functions */
/** biome-ignore-all lint/correctness/noUnusedVariables: used globally */

interface Window {
    GetParentResourceName(): string;
}

declare module '*.css' {
    const classes: { [className: string]: string };
    export default classes;
}
