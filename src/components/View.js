import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({bags, deleteBag}) => {
    return bags.map(bag=>(
        <tr key={bag.bag_name}>
            <td>{bag.bag_name}</td>
            <td>{bag.brand}</td>
            <td>{bag.color}</td>
            <td>{bag.price}</td>
            <td className='delete-btn' onClick={()=>deleteBag(bag.bag_name )}>
                <Icon icon={trash}/>
            </td>
        </tr>
    ))
}