import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from './PageTitle'
import Item from './Item'
import AddItem from './AddItem'
import { fetchGetItemsData } from '../redux/slices/apiSlice'
import { SkeletonTheme } from 'react-loading-skeleton'
import LoadingSkeleton from './LoadingSkeleton'
import Modal from './Modal'
import { openModal } from '../redux/slices/modalSlice';


const ItemPanel = ({pageTitle, filterCompleted, filterImportant}) => {
  // console.log(filterCompleted, fiterImportant);
  const authData = useSelector((state)=>state.auth.authData)
  const userKey = authData?.sub
  const dispatch = useDispatch()

  const getTasksData = useSelector((state)=>state.apis.getItemsData)
  const isOpen = useSelector((state)=>state.modal.isOpen)
  // console.log(isOpen);
  // console.log(getTasksData);

  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    if(!userKey) return;

    const fetchGetItems = async() => {
      try {
        setLoading(true)
        await dispatch(fetchGetItemsData(userKey)).unwrap() // useEffect 내부에서 dispatch 함수를 호출하여 thunk 함수 실행
      }
      catch (error) {
        console.error('Failed to Fetch Items : ', error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchGetItems()
  }, [dispatch, userKey])


  // 1. home 메뉴를 선택할 때:
  // - all메뉴를 선택하면 첫 번째 filter 조건이 true이므로 모든 task를 반환
  // - 1번에서 반환된 모든 tasks를 대상으로 두 번째 filter 조건을 적용
  // - filterImportant가 undefined이면 조건이 true 이므로 모든 task를 반환

  // 2. Completed 메뉴를 선택할 때:
  // - 첫 번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
  // - filterCompleted가 true이면 task.iscompleled가 true인 task만 반환

  // 3. Proceeding 메뉴를 선택할 때:
  // - 첫 번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
  // - filterCompleted가 false이면 task.iscompleled가 false인 task만 반환

  // 4. Important 메뉴를 선택할 때:
  // - 첫 번째 필터 조건에서 if문이 true이므로 두 번째 필터 조건으로 이동
  // - 두 번째 filter 조건에서 filterImportant가 없으면 true이므로 모든 task를 반환(home, Completed, Proceeding과 동일)
  // - filterImportant가 true이면 task.isimportant가 true인 task만 반환

  const filterTasks = getTasksData?.filter((task)=>{
    if(filterCompleted === 'all') return true
    return filterCompleted ? task.iscompleted : !task.iscompleted
  }).filter((task)=>{
    if(filterImportant === undefined) return true
    return filterImportant ? task.isimportant : !task.isimportant
  })

  const handleOpenModal = () => {
    dispatch(openModal({ modalType:"create", task: null }))
  }


  return (
    <div className='panel bg-[#1a1a1a] w-[calc(100%-80px)] lg:w-4/5 h-full rounded-md border border-neutral-500 py-5 px-4 overflow-y-auto'>
      {userKey?(<div className='panel-wraper w-full h-full'>
        {isOpen && <Modal/>}
        <div className='flex justify-between items-center'>
        <PageTitle title={pageTitle}/>
          <button className='text-sm py-1 px-3 border border-neutral-500 rounded-md hover:bg-neutral-600 hover:text-neutral-50 cursor-pointer mb-1 sm:block md:hidden xl:hidden' onClick={handleOpenModal}>할 일 추가</button>
        </div>
        
        <div className='items flex flex-wrap'>
          {loading ? (
            <SkeletonTheme baseColor='#1c1c1c' highlightColor='#444' width='100%' height='25vh'>
              <LoadingSkeleton/>
              <LoadingSkeleton/>
              <LoadingSkeleton/>
            </SkeletonTheme>
          ):(
              filterTasks?.map((item, idx)=>(
              <Item key={idx} task={item} />
            )))
          }
          <AddItem/>
        </div>
      </div>
    ):(
      <div className='w-full h-full flex items-center justify-center'>
        <button className='flex justify-center items-center bg-neutral-300 text-neutral-900 py-2 px-4 rounded-md cursor-default'>
          <span className='text-sm font-semibold tracking-tighter'>
            로그인이 필요한 서비스 입니다.
          </span>
        </button>
      </div>)}
    </div>
  )
}

export default ItemPanel