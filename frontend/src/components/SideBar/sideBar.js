import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channels";
import { fetchDMs } from "../../store/dms";
import { fetchWorkspace } from "../../store/workspaces";
import './sideBar.css'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import NewChannelModal from "../Channel/NewChannelModal";
import { Link } from "react-router-dom";

const SideBar = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { userId } = useParams();
    const { channelId } = useParams();
    const { dmId } = useParams();
    const [channelOpen, setChannelOpen] = useState(false);
    const [dmOpen, setDMOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleChannelVisibility = () => {
        setChannelOpen(!channelOpen)
    };

    const toggleDMVisibility = () => {
        setDMOpen(!dmOpen)
    };

    useEffect(() => {
        dispatch(fetchWorkspace(workspaceId))
    }, [workspaceId])

    useEffect(() => {
        dispatch(fetchChannels(workspaceId))
    }, [])

    useEffect(() => {
        dispatch(fetchDMs(workspaceId))
    }, [])
    
    const sessionUser = useSelector(state => state.session.user)
    const workspace = useSelector(state => Object.values(state.workspaces))
    const allUserchannels = useSelector(state => Object.values(state.session.user.channels))
    const dms = useSelector(state => Object.values(state.dms))
    
    if (sessionUser === null) {
        return null;
    }
    
    if (workspace.length === 0) {
        return null;
    }
    
    if (dms.length === 0){
        return null;
    };
    
    console.log(workspace[0].id)
    const channels = allUserchannels.filter(channel => channel.workspace_id === workspace[0].id)
    
    return (
        <div class="user-sidebar">
            {/* <h1 class="sidebar-workspace-name">{workspace[0].name}</h1> */}
            <div class="sidebar-list">
                <div class="sidebar-list-header">
                    <button class="sidebar-arrow" onClick={toggleChannelVisibility}>
                        {channelOpen ? <BiSolidRightArrow /> : <BiSolidDownArrow />}
                        <span class="sidebar-arrow-header">Channels</span>
                    </button>
                    <NewChannelModal />
                </div>
                <ul className="sidebar-menu"> 
                        {channels.map(channel => 
                            <a class={`sidebar-list-item-container ${channelOpen ? 'hidden' : ''} ${channel.id == channelId ? 'selected-blue-channel' : ''}`} href={`/user/${userId}/${workspaceId}/channel/${channel.id}`}>
                                <li class="sidebar-list-item">
                                    <span class="sidebar-hashtag">#</span>
                                    <span class={`sidebar-item-name ${channel.id == channelId ? 'selected-blue-channel' : ''}`}>{channel.name}</span>
                                </li>
                            </a>
                        )}
                </ul>
                <a class={`sidebar-list-item-container ${channelOpen ? 'hidden' : ''} `} href={`/user/${userId}/${workspaceId}/`}>
                    <li class="sidebar-list-item-browse">
                        <span class="sidebar-button-image-container-browse"><AiOutlinePlus /></span>
                        <span class="sidebar-item-name">Browse Channels</span>
                    </li>
                </a>
            </div>
            <div class="sidebar-list">
                <div class="sidebar-list-header">
                    <button class="sidebar-arrow" onClick={toggleDMVisibility}>
                        {dmOpen ? <BiSolidRightArrow /> : <BiSolidDownArrow />}
                        <span class="sidebar-arrow-header">Direct Messages</span>
                    </button>
                    <Link to={`/user/${userId}/${workspaceId}/dms`}>
                        <button class="sidebar-button-image-container">
                            <AiOutlinePlus />
                        </button>
                    </Link>
                </div>
                <ul className="sidebar-menu"> 
                    {dms.map(dm => 
                        <a class={`sidebar-list-item-container ${dmOpen ? 'hidden' : ''} ${dm.id == dmId ? 'selected-blue-channel' : ''}`} href={`/user/${userId}/${workspaceId}/dm/${dm.id}`}>
                            <li class="sidebar-list-item">
                                <span class="sidebar-hashtag">#</span>
                                <span class={`sidebar-item-name ${dm.id == dmId ? 'selected-blue-channel' : ''}`}>{(dm.users.filter(user => user.id !== sessionUser.id).map(user => user.displayName)).join(", ")}</span>
                            </li>
                        </a>
                    )}
                </ul>
            </div>

        </div>
    )
}

export default SideBar;