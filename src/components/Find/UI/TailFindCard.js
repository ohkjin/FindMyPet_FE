import React from 'react'

export default function TailCard({k,theme,imgSrc,title,subtitle,by}) {
    let eachtags="";
    const themeColor = {
        'white':['bg-yellow-400/40 text-slate-900/75',500,400,300,'bg-white/[0.8]'],
        'black':['bg-sky-500/20 text-gray-200',300,400,900,'bg-violet-300/5'],
        '':['bg-sky-500/20 text-gray-200',300,400,900,'bg-violet-300/5'],
    }
    // if(tags.length!==0){
    // tags = tags.split(", ");
    // //inline block: 각 글을 auto로 둘러싼다. 그러면 따로 외부에 무언가 주어주지 않아도 알아서 다음 줄로 넘어간다.
    // eachtags = tags.map((t,idx)=><span key={`tagspan${idx}`} className={`bg-violet-300/20 inline-block rounded-full px-2 py-1 text-xs text-gray-${themeColor[theme][1]} mr-2 mb-1`}>
    //                                 {t}
    //                            </span>)
    // }
  return (
    //justify-self-start self-start: 길이 자동 조절
    // .iipWfW {
    //     position: relative;
    //     display: flex;
    //     flex-direction: column;
    //     margin: 0px auto;
    //     border-radius: 10px;
    //     background-color: white;
    //     transition: all 0.3s ease-in-out 0s;
    //     box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
    // }
    <div key={k} className={`${themeColor[theme][4]}  w-[calc(-3rem + 50vw)] group rounded-xl shadow-md transition duration-15- ease-in-out hover:-translate-y-1 p-3 cursor-pointer `}>
        <div className="max-w-64 max-h-52 aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 rounded-lg lg:aspect-none group-hover:opacity-75 ">
                <img 
                src={imgSrc} alt={title}
                className="h-full w-full object-cover object-center bg-black bg-blend-multiply lg:h-full lg:w-full "
                />
        </div>
        <div className="mt-4 flex flex-col justify-left">
            <h3 className={`${themeColor[theme][0]} rounded-md font-semibold text-sm  flex justify-left items-center`}>
                {title}
            </h3>
            <p className={`mt-1 text-sm text-gray-${themeColor[theme][1]}`}>
                {subtitle}
            </p>
            <p className={`mt-1 text-xs text-gray-${themeColor[theme][2]}`}>
                {by}
            </p>
            <div className="px-1 pt-2 pb-1">
                {eachtags}
            </div>
        </div>
    </div>
  )
}
//Gallery.js
//Festival.js

    