export const SvgIcon = ({ className, src, width, height }) => (
  <img className={className} src={`/img/svg/${src}`} alt={src} width={width} height={height} />
);
