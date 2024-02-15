import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function MyPageEdit() {
    const [sParams] = useSearchParams();
    const userId = sParams.get('userId');
    const nickname = sParams.get('nickname');
    return (
        <div>
            <div>
                <div>
                </div>
                <div>
                    <form>
                        <input></input>
                    </form>
                </div>
            </div>
        </div>
    )
}
