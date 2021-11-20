import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import hero2 from "../../../images/hero2.png";
import hero1 from "../../../images/hero1.png";
import hero3 from "../../../images/hero3.png";
import styled from "styled-components/macro";

import { useHistory } from "react-router";
const Image = styled.img`
  width: 70%;
  border-radius: 15px;
  cursor: pointer;
`;
const ImageContainer = styled.div`
  cursor: pointer;
`;

export const LandingCarousel = () => {
  const { push } = useHistory();

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={3500}
      showStatus={false}
    >
      <ImageContainer onClick={() => push("/example")}>
        <Image src="https://ik.imagekit.io/ticnymjalpq/hero3_1qKJ4kxZbwU.png" />
      </ImageContainer>
      <ImageContainer onClick={() => push("/example")}>
        <Image
          src="https://ik.imagekit.io/ticnymjalpq/hero2_opU2VJaNJEL.png"
          onClick={() => push("/example")}
        />
      </ImageContainer>
      <ImageContainer onClick={() => push("/example")}>
        <Image src="https://ik.imagekit.io/ticnymjalpq/hero1_aGrSmAfT2rt.png" />
      </ImageContainer>
    </Carousel>
  );
};
