export const animate = (variants, custom = null) => {
    return {
        initial: "initial",
        animate: "animate",
        exit: "exit",
        variants,
        custom,
    };
};
