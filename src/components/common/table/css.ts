export const fixedCss = (isFixed: boolean) => {
  return {
    position: {
      lg: isFixed ? 'sticky' : '',
      zIndex: 1,
      top: 0,
      left: 0
    }
  };
};
