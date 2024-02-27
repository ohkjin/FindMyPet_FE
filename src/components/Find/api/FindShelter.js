import { useRef, useState } from "react";
import { findApi } from "./FindApi";
import TailSelectSigungu from "../UI/TailSelectSigungu";
import TailSelectShelter from "../UI/TailSelectShelter"
import sidoObjList from '../../../data/find/sido.json'

// 이 component handleShelter를 선언해야하고
// 각각의 code가 필요시 아래사용
// const [codes,setCodes] = useState({
//     sido:'',
//     gungu:'',
//     shelter:'',
// })
export default function FindShelter({handleSelectShelter,codes,setCodes}) {
    const apikey = process.env.REACT_APP_API_KEY

    //-- 보호소 선택 --//
    const sidoRef = useRef();
    const [sigunguObjList, setSigunguObjList] = useState([]);
    const gunguRef = useRef();
    const [shelterObjList, setShelterObjList] = useState([]);
    const shelterRef = useRef();
    // const [codes,setCodes] = useState({
    //     sido:'',
    //     gungu:'',
    //     shelter:'',
    // })
    // 시도 선택시 value에 넣은 시도코드가 돌아온다
    const handleSelectSido = (e) => {
        e.preventDefault();
        if (e.target.value !== '') {
            findApi(`/sigungu?serviceKey=${apikey}&upr_cd=${e.target.value}&_type=json`)
            .then((body) => {
                if(!body.items.item){return}
                // console.log(body);
                // 보호소 초기화
                    gunguRef.current.value = '';
                    shelterRef.current.value = '';
                    {setCodes&&
                    setCodes({
                        sido:e.target.value,
                        gungu:'',
                        shelter:'',
                    })}
                    setSigunguObjList(body.items.item);
                })
                .catch(err => console.log(err))
        }
    }
    const handleSelectSigungu = (e) => {
        e.preventDefault();
        console.log("name",e.target)
        if (e.target.value !== '') {
            findApi(`/shelter?serviceKey=${apikey}&upr_cd=${sidoRef.current.value}&org_cd=${e.target.value}&_type=json`)
                .then((body) => {
                    if(!body.items.item){return}
                    // console.log("sidoR",sidoRef.current.value);
                    // console.log("gunR",gunguRef.current.value);
                    // 보호소 초기화
                    shelterRef.current.value = '';
                    {setCodes&&codes&&
                    setCodes({
                        ...codes,
                        gungu:e.target.value,
                        shelter:'',
                    })
                    }
                    setShelterObjList(body.items.item);
                })
                .catch(err => console.log(err))
        }
    }
 

    return (
        <div className="Category">
                <div className="mt-4 block font-tenada  md:text-lg font-medium leading-6 text-gray-900">
                    보호소 선택
                </div>
                <div className="bg-[#fffef5] shadow rounded-md p-2 mt-2 flex flex-col">
                    <TailSelectSigungu handleChange={handleSelectSido} selRef={sidoRef} optionWithValue={sidoObjList} init={`-- 시도 선택 --`} />
                    <TailSelectSigungu handleChange={handleSelectSigungu} selRef={gunguRef} optionWithValue={sigunguObjList} init={`-- 시군구 선택 --`} />
                    <TailSelectShelter handleChange={handleSelectShelter} selRef={shelterRef} optionWithValue={shelterObjList} init={`-- 보호소 선택 --`} />
                </div>
        </div>
    )
}
