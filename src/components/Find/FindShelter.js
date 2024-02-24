import { useRef, useState } from "react";
import { findApi } from "./FindApi";
import TailSelectSigungu from "./UI/TailSelectSigungu";
import TailSelectShelter from "./UI/TailSelectShelter"
import sidoObjList from '../../data/find/sido.json'

export default function FindShelter({handleSelectShelter}) {
    const apikey = process.env.REACT_APP_API_KEY

    //-- 보호소 선택 --//
    const sidoRef = useRef();
    const [sigunguObjList, setSigunguObjList] = useState([]);
    const gunguRef = useRef();
    const [shelterObjList, setShelterObjList] = useState([]);
    const shelterRef = useRef();
    // 시도 선택시 value에 넣은 시도코드가 돌아온다
    const handleSelectSido = (e) => {
        e.preventDefault();
        if (e.target.value !== '') {
            findApi(`/sigungu?serviceKey=${apikey}&upr_cd=${e.target.value}&_type=json`)
                .then((item) => {
                    // console.log(item);
                    // 군구,보호소 초기화
                    if(!item){return}
                    gunguRef.current.value = '';
                    shelterRef.current.value = '';
                    setSigunguObjList(item);
                })
                .catch(err => console.log(err))
        }
    }
    const handleSelectSigungu = (e) => {
        e.preventDefault();
        if (e.target.value !== '') {
            findApi(`/shelter?serviceKey=${apikey}&upr_cd=${sidoRef.current.value}&org_cd=${e.target.value}&_type=json`)
                .then((item) => {
                    if(!item){return}
                    // console.log(item);
                    // 보호소 초기화
                    shelterRef.current.value = '';
                    setShelterObjList(item);
                })
                .catch(err => console.log(err))
        }
    }
 

    return (
        <div className="Category sm:col-span-4">
            <>
                <div className="mt-4 block font-tenada text-sm font-medium leading-6 text-gray-900">
                    보호소 선택
                </div>
                <div className=" mt-2 flex flex-col">
                    <TailSelectSigungu handleChange={handleSelectSido} selRef={sidoRef} optionWithValue={sidoObjList} init={`-- 시도 선택 --`} />
                    {sidoRef !== '' && <TailSelectSigungu handleChange={handleSelectSigungu} selRef={gunguRef} optionWithValue={sigunguObjList} init={`-- 시군구 선택 --`} />}
                    {gunguRef !== '' && <TailSelectShelter handleChange={handleSelectShelter} selRef={shelterRef} optionWithValue={shelterObjList} init={`-- 보호소 선택 --`} />}
                </div>
            </>
        </div>
    )
}
