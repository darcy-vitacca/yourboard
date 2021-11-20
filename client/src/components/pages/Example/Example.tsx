import React, { FC, useEffect } from "react";
import {
  SectionContainer,
  PageLayoutContainer,
} from "../../../shared/Layout.styles";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Loader } from "../../../shared/loaders";
import { LinkSection } from "../LinkSection/LinkSection";
import { ProjectSection } from "../ProjectSection/ProjectSection";
import { useHistory } from "react-router";

export const Example: FC = () => {
  const dispatch = useAuthDispatch();
  const { currentProject, loading, authenticated } = useAuthState();
  const { push } = useHistory();
  if (authenticated) push("/");

  useEffect(() => {
    dispatch("SET_PROJECTS", projects);
    return () => {
      dispatch("SET_PROJECTS", null);
      dispatch("RETURN_INITIAL_STATE_CURRENT_PROJECT");
    };
  }, []);

  const projects = [
    {
      createdAt: "2021-11-19T05:26:26.672Z",
      updatedAt: "2021-11-19T05:26:26.672Z",
      project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
      project_name: "Best TV/ Movies 🎥",
      description: "Tv shows/Movies that will open straight ready to play",
      url_name: null,
      user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
      links: [
        {
          createdAt: "2021-11-19T05:34:14.069Z",
          updatedAt: "2021-11-19T05:34:14.069Z",
          link_id: "3543c623-796d-4fd0-86bd-d143c3d82c51",
          url_name: "Silver linings playbook",
          url: "https://www.netflix.com/title/70244164",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.netflix.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 16,
        },
        {
          createdAt: "2021-11-19T05:28:15.591Z",
          updatedAt: "2021-11-19T05:28:15.591Z",
          link_id: "10a6fb1b-d1cf-4cdf-8ccc-273cd529afaf",
          url_name: "Midnight Mass",
          url: "https://www.netflix.com/title/81083626",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.netflix.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 1,
        },
        {
          createdAt: "2021-11-19T05:28:31.227Z",
          updatedAt: "2021-11-19T05:28:31.227Z",
          link_id: "aae12b8b-4b68-4ea0-8eeb-ecd2290969be",
          url_name: "Squid Games",
          url: "https://www.netflix.com/au/title/81040344",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.netflix.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 2,
        },
        {
          createdAt: "2021-11-19T05:29:09.351Z",
          updatedAt: "2021-11-19T05:29:09.351Z",
          link_id: "ca021084-d2cd-4fe2-8935-1a12e0b60a61",
          url_name: "Reservation Dogs",
          url: "https://www.hulu.com/series/reservation-dogs-5a310c23-e2db-4c9f-a66c-27c2fee43d92",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.hulu.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 3,
        },
        {
          createdAt: "2021-11-19T05:29:58.585Z",
          updatedAt: "2021-11-19T05:29:58.585Z",
          link_id: "9cac0f77-2501-482b-819b-5b85c56686a4",
          url_name: "White Lotus",
          url: "https://www.hbo.com/the-white-lotus",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.hbo.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 4,
        },
        {
          createdAt: "2021-11-19T05:30:14.380Z",
          updatedAt: "2021-11-19T05:30:14.380Z",
          link_id: "5211d4f6-6bd5-4ade-a3e0-da417901b014",
          url_name: "Sweet Tooth",
          url: "https://www.netflix.com/title/81221380",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.netflix.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 5,
        },
        {
          createdAt: "2021-11-19T05:30:56.875Z",
          updatedAt: "2021-11-19T05:30:56.875Z",
          link_id: "38cfae59-8c46-4c2e-b40a-6d53df97a3e9",
          url_name: "The Matrix",
          url: "https://www.hulu.com/movie/the-matrix-6d5af217-1bf0-4a73-9c92-cdffa01fbe0c",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.hulu.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 6,
        },
        {
          createdAt: "2021-11-19T05:31:15.093Z",
          updatedAt: "2021-11-19T05:31:15.093Z",
          link_id: "259f043e-e71e-4f4e-8e62-52b51abe206e",
          url_name: "The Fifth Element",
          url: "https://www.hulu.com/movie/the-fifth-element-865a225a-d824-480a-9133-05d284ec9785?xs=1",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.hulu.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 7,
        },
        {
          createdAt: "2021-11-19T05:31:22.549Z",
          updatedAt: "2021-11-19T05:31:22.549Z",
          link_id: "f40d31d3-1c73-4e04-8520-0e459b6aba70",
          url_name: "Fargo",
          url: "https://www.hulu.com/movie/fargo-1493856d-41bd-4f3c-ac65-bfaf80938a07?xs=1",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.hulu.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 8,
        },
        {
          createdAt: "2021-11-19T05:31:30.107Z",
          updatedAt: "2021-11-19T05:31:30.107Z",
          link_id: "5b87fb89-e0e5-4c67-bb62-44e5d93c1c5f",
          url_name: "Snatch",
          url: "https://www.hulu.com/movie/snatch?xs=1",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.hulu.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 9,
        },
        {
          createdAt: "2021-11-19T05:31:42.750Z",
          updatedAt: "2021-11-19T05:31:42.750Z",
          link_id: "964f5b23-946b-4cab-ade0-2b9500263207",
          url_name: "Alien",
          url: "https://www.amazon.com/Alien-Sigourney-Weaver/dp/B003GXJ072?tag=digitrend08sub7-20&_keeptag=1",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.amazon.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 10,
        },
        {
          createdAt: "2021-11-19T05:31:54.263Z",
          updatedAt: "2021-11-19T05:31:54.263Z",
          link_id: "2faa52d7-2f0c-44f0-9898-901c525052dc",
          url_name: "Full Metal Jacket",
          url: "https://play.hbomax.com/page/urn:hbo:page:GXdu2cQzfysPCwwEAADXM:type:feature?xs=1",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=play.hbomax.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 11,
        },
        {
          createdAt: "2021-11-19T05:32:03.790Z",
          updatedAt: "2021-11-19T05:32:03.790Z",
          link_id: "fb2d9021-e80d-46aa-8592-c30ac007c744",
          url_name: "A Clockwork orange",
          url: "https://play.hbomax.com/page/urn:hbo:page:GYDbZxAw93SuQKAEAAAAD:type:feature?xs=1",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=play.hbomax.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 12,
        },
        {
          createdAt: "2021-11-19T05:32:07.927Z",
          updatedAt: "2021-11-19T05:32:07.927Z",
          link_id: "cce6e3a3-f282-452e-a1d5-306bb84ea7ff",
          url_name: "Dune",
          url: "https://play.hbomax.com/page/urn:hbo:page:GYUjdLgBiJp5otAEAAAAJ:type:feature?xs=1",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=play.hbomax.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 13,
        },
        {
          createdAt: "2021-11-19T05:32:26.449Z",
          updatedAt: "2021-11-19T05:32:26.449Z",
          link_id: "20046f7d-58d9-4bc9-bbf4-38a30d5b99fc",
          url_name: "The Velvet Underground",
          url: "https://tv.apple.com/us/movie/the-velvet-underground/umc.cmc.69ic79cvvy80epfhz5efdgjjd",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=tv.apple.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 14,
        },
        {
          createdAt: "2021-11-19T05:33:03.269Z",
          updatedAt: "2021-11-19T05:33:15.993Z",
          link_id: "2914e452-67c5-4679-83a7-2b51372efec6",
          url_name: "Dead poets society",
          url: "https://www.amazon.com/Dead-Poets-Society-Robin-Williams/dp/B00AOB3XHC?ots=1&&linkCode=ll2&tag=ewbestmoviesonamazonprimeupdatessprague1021-20&linkId=f122339e5fdeb7bf6266abb09462092e&language=en_US&ref_=as_li_ss_tl",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.amazon.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 15,
        },
        {
          createdAt: "2021-11-19T05:27:51.899Z",
          updatedAt: "2021-11-19T05:27:51.899Z",
          link_id: "8b015023-dbf0-4485-aad2-40a8131b555b",
          url_name: "Only murders in the building",
          url: "https://www.disney.com.au/disney-plus-star/only-murders-in-the-building",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.disney.com.au",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
          subfolder_id: null,
          clicked: null,
          position: 0,
        },
      ],
      project_users: [
        {
          createdAt: "2021-11-19T05:26:26.680Z",
          updatedAt: "2021-11-19T05:26:26.680Z",
          id: 103,
          full_name: "John Smith",
          status: true,
          email: "darcyvitacca@gmail.com",
          owner: true,
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "84f1de63-a888-43ff-87ef-4313eb0a7650",
        },
      ],
    },
    {
      createdAt: "2021-11-19T05:17:39.922Z",
      updatedAt: "2021-11-19T05:17:39.922Z",
      project_id: "7b6f7be0-6dff-4c43-bea0-251b35b41615",
      project_name: "Streaming 📺",
      description: "Streaming services",
      url_name: null,
      user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
      links: [
        {
          createdAt: "2021-11-19T05:19:32.229Z",
          updatedAt: "2021-11-19T05:19:32.229Z",
          link_id: "0bd80151-bae2-43d9-b029-5f6bceefc698",
          url_name: "HBO max",
          url: "https://www.hbomax.com/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.hbomax.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "7b6f7be0-6dff-4c43-bea0-251b35b41615",
          subfolder_id: null,
          clicked: null,
          position: 4,
        },
        {
          createdAt: "2021-11-19T05:19:56.799Z",
          updatedAt: "2021-11-19T05:19:56.799Z",
          link_id: "de07c364-3b5f-439d-857d-b4f748132a4a",
          url_name: "Apple TV",
          url: "https://tv.apple.com/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=tv.apple.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "7b6f7be0-6dff-4c43-bea0-251b35b41615",
          subfolder_id: null,
          clicked: null,
          position: 5,
        },
        {
          createdAt: "2021-11-19T05:17:54.621Z",
          updatedAt: "2021-11-19T05:17:54.621Z",
          link_id: "e3812a17-c8b3-42e5-8783-48f100c4a4e9",
          url_name: "Netflix",
          url: "https://www.netflix.com/browse",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.netflix.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "7b6f7be0-6dff-4c43-bea0-251b35b41615",
          subfolder_id: null,
          clicked: null,
          position: 0,
        },
        {
          createdAt: "2021-11-19T05:18:09.354Z",
          updatedAt: "2021-11-19T05:18:09.354Z",
          link_id: "c2e3de33-9817-4591-97bf-166c5632e591",
          url_name: "Hulu",
          url: "https://www.hulu.com/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.hulu.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "7b6f7be0-6dff-4c43-bea0-251b35b41615",
          subfolder_id: null,
          clicked: null,
          position: 1,
        },
        {
          createdAt: "2021-11-19T05:18:27.264Z",
          updatedAt: "2021-11-19T05:18:27.264Z",
          link_id: "f2aa5030-a132-4813-8d9d-9753c311db99",
          url_name: "Amazon Prime",
          url: "https://www.primevideo.com/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.primevideo.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "7b6f7be0-6dff-4c43-bea0-251b35b41615",
          subfolder_id: null,
          clicked: null,
          position: 2,
        },
        {
          createdAt: "2021-11-19T05:18:54.979Z",
          updatedAt: "2021-11-19T05:18:54.979Z",
          link_id: "26388474-cd39-464d-a315-b751b91e8194",
          url_name: "Disney",
          url: "https://www.disney.com.au/news/introducing-disney-plus-streaming-service",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.disney.com.au",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "7b6f7be0-6dff-4c43-bea0-251b35b41615",
          subfolder_id: null,
          clicked: null,
          position: 3,
        },
      ],
      project_users: [
        {
          createdAt: "2021-11-19T05:17:39.928Z",
          updatedAt: "2021-11-19T05:17:39.928Z",
          id: 102,
          full_name: "John Smith",
          status: true,
          email: "darcyvitacca@gmail.com",
          owner: true,
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "7b6f7be0-6dff-4c43-bea0-251b35b41615",
        },
      ],
    },
    {
      createdAt: "2021-11-19T05:16:24.874Z",
      updatedAt: "2021-11-19T05:16:24.874Z",
      project_id: "6284abc8-756c-4845-a7bc-4df8921920c7",
      project_name: "Shopping 🛒",
      description: "Shopping websites",
      url_name: null,
      user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
      links: [
        {
          createdAt: "2021-11-19T05:20:49.172Z",
          updatedAt: "2021-11-19T05:20:49.172Z",
          link_id: "a313426e-e1b4-41ab-907b-04e075b61b01",
          url_name: "Ebay ",
          url: "https://www.ebay.com/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.ebay.com.au",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "6284abc8-756c-4845-a7bc-4df8921920c7",
          subfolder_id: null,
          clicked: null,
          position: 1,
        },
        {
          createdAt: "2021-11-19T05:20:33.915Z",
          updatedAt: "2021-11-19T05:21:02.241Z",
          link_id: "414f6a26-e08c-42a3-9936-cc5263f90f6d",
          url_name: "Amazon ",
          url: "https://www.amazon.com/US/s?k=US",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.amazon.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "6284abc8-756c-4845-a7bc-4df8921920c7",
          subfolder_id: null,
          clicked: null,
          position: 0,
        },
      ],
      project_users: [
        {
          createdAt: "2021-11-19T05:16:24.879Z",
          updatedAt: "2021-11-19T05:16:24.879Z",
          id: 101,
          full_name: "John Smith",
          status: true,
          email: "darcyvitacca@gmail.com",
          owner: true,
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "6284abc8-756c-4845-a7bc-4df8921920c7",
        },
      ],
    },
    {
      createdAt: "2021-11-19T05:14:42.852Z",
      updatedAt: "2021-11-19T05:14:42.852Z",
      project_id: "cf28db51-1de2-4b4c-9ad2-1d1c31a55088",
      project_name: "Most visited websites 🔎",
      description: "Most visited websites",
      url_name: null,
      user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
      links: [
        {
          createdAt: "2021-11-19T05:15:07.547Z",
          updatedAt: "2021-11-19T05:15:07.547Z",
          link_id: "b331d381-d2be-43c5-886d-55bb7f073bd8",
          url_name: "Google",
          url: "https://www.google.com/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.google.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "cf28db51-1de2-4b4c-9ad2-1d1c31a55088",
          subfolder_id: null,
          clicked: null,
          position: 1,
        },
        {
          createdAt: "2021-11-19T05:15:54.336Z",
          updatedAt: "2021-11-19T05:15:54.336Z",
          link_id: "7a3e7f83-544f-4af4-8f62-573a8e320d2c",
          url_name: "Wikipedia",
          url: "http://Wikipedia.org",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=wikipedia.org",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "cf28db51-1de2-4b4c-9ad2-1d1c31a55088",
          subfolder_id: null,
          clicked: null,
          position: 1,
        },
      ],
      project_users: [
        {
          createdAt: "2021-11-19T05:14:42.857Z",
          updatedAt: "2021-11-19T05:14:42.857Z",
          id: 100,
          full_name: "John Smith",
          status: true,
          email: "darcyvitacca@gmail.com",
          owner: true,
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "cf28db51-1de2-4b4c-9ad2-1d1c31a55088",
        },
      ],
    },
    {
      createdAt: "2021-11-19T05:12:58.009Z",
      updatedAt: "2021-11-19T05:12:58.009Z",
      project_id: "0437a477-14bc-40ff-910a-a3d72c4c7c84",
      project_name: "Social Media 🧑‍🤝‍🧑",
      description: "Social media Sites",
      url_name: null,
      user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
      links: [
        {
          createdAt: "2021-11-19T05:13:12.119Z",
          updatedAt: "2021-11-19T05:13:12.119Z",
          link_id: "057e2bbd-0bbf-4b6b-90c1-0a6d871fb9d1",
          url_name: "Twitter",
          url: "https://twitter.com/home",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=twitter.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "0437a477-14bc-40ff-910a-a3d72c4c7c84",
          subfolder_id: null,
          clicked: null,
          position: 0,
        },
        {
          createdAt: "2021-11-19T05:13:35.510Z",
          updatedAt: "2021-11-19T05:13:35.510Z",
          link_id: "ffd035eb-2495-4797-88be-0dadf46bf7e0",
          url_name: "Facebook",
          url: "https://www.facebook.com/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.facebook.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "0437a477-14bc-40ff-910a-a3d72c4c7c84",
          subfolder_id: null,
          clicked: null,
          position: 2,
        },
        {
          createdAt: "2021-11-19T05:13:53.365Z",
          updatedAt: "2021-11-19T05:13:53.365Z",
          link_id: "4014e4b2-bb45-43b6-800b-b374a45ae5e9",
          url_name: "TikTok",
          url: "https://www.tiktok.com/en/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.tiktok.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "0437a477-14bc-40ff-910a-a3d72c4c7c84",
          subfolder_id: null,
          clicked: null,
          position: 3,
        },
        {
          createdAt: "2021-11-19T05:14:05.888Z",
          updatedAt: "2021-11-19T05:14:05.888Z",
          link_id: "a6b747b0-4eed-4a20-9a92-bcd37ece785e",
          url_name: "Instagram",
          url: "https://www.instagram.com/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.instagram.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "0437a477-14bc-40ff-910a-a3d72c4c7c84",
          subfolder_id: null,
          clicked: null,
          position: 4,
        },
        {
          createdAt: "2021-11-19T05:13:21.170Z",
          updatedAt: "2021-11-19T05:13:21.170Z",
          link_id: "dba7d16c-8071-4b4a-bfd7-6beb96ed930e",
          url_name: "Reddit",
          url: "https://www.reddit.com/",
          url_image:
            "https://www.google.com/s2/favicons?domain_url=www.reddit.com",
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "0437a477-14bc-40ff-910a-a3d72c4c7c84",
          subfolder_id: null,
          clicked: null,
          position: 1,
        },
      ],
      project_users: [
        {
          createdAt: "2021-11-19T05:12:58.019Z",
          updatedAt: "2021-11-19T05:12:58.019Z",
          id: 99,
          full_name: "John Smith",
          status: true,
          email: "darcyvitacca@gmail.com",
          owner: true,
          user_id: "af066bda-37d4-4ab3-a936-7d4dc3cf30f2",
          project_id: "0437a477-14bc-40ff-910a-a3d72c4c7c84",
        },
      ],
    },
  ];

  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          {loading && <Loader />}
          {!currentProject ? (
            <ProjectSection projects={projects} />
          ) : (
            <LinkSection
              currentProject={currentProject}
              key={currentProject?.project_id}
            />
          )}
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
