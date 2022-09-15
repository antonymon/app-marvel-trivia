import { useEffect, useState } from "react";
import { SvgIcon } from "../SvgIcon";
import { ScrollUpContainer } from "./styles";
import { getScroll } from "../utils/getWindow";

const ScrollToTop = (props) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = (event) => {
    const offsetFromTop = getScroll(event.target, true);

    if (!showScroll && offsetFromTop > 350) {
      setShowScroll(true);
    } else if (offsetFromTop <= 350) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollUp = () => {
    const componetsCustom = ["comics", "characters", "comicsList", "searchResult"];
    const isComponentCustom = componetsCustom.includes(props.component);

    if (isComponentCustom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {

      const element = document.getElementById("intro");
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  };

  return (
    <ScrollUpContainer onClick={scrollUp} show={showScroll}>
      <SvgIcon src="scroll-top.svg" width="20px" height="20px" />
    </ScrollUpContainer>
  );
};

export default ScrollToTop;
