import dayjs from 'dayjs';
import 'dayjs/locale/en';

const Task = ({task}) => {
    return ( 
           <>
            <div className="task__content">
                <h3>{task.name}</h3>
                <p>{task.type}</p>
                <h4>{ dayjs(task.date.split('T')[0]).format("DD, MMM 'YY")}</h4>
                <p className={ task.status === 'completed' ? 'status completed' : 'status'}>{task.status}</p>
            </div>
           </>
     );
}
 
export default Task;