import React from 'react'
import HomePageCarousel from '../../components/Carousal/HomePageCarousal'
import HomeSection from '../../components/Carousal/HomeSection'
import { Mens_Kurta } from '../../../Data/HomePage_Datas/Mens_Kurta';
import { Shoes } from '../../../Data/HomePage_Datas/Shoes';
import { Shirts } from '../../../Data/HomePage_Datas/Mens_Shirt';
import { Womens_Dress } from '../../../Data/HomePage_Datas/womens_Dress';
import { Saree } from '../../../Data/HomePage_Datas/Womens_Saree';

const HomePage = () => {
  return (
    <div>
      <HomePageCarousel />

      {/* <div className="space-y-10 py-20 flex flex-col justify-center">
        <HomeSection data={Mens_Kurta} sectionName={"Mens Kurta's"} />

        <HomeSection data={Shoes} sectionName={"Mens Shoes's"} />
        <HomeSection data={Shirts} sectionName={"Mens Shirt's"} />
        <HomeSection data={Saree} sectionName={"Women's Sarees"} />
        <HomeSection data={Womens_Dress} sectionName={"Women's Dress"} />
      </div> */}
    </div>
  );
}

export default HomePage