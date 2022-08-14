import {TabProps} from '../../components/Tabs'

const Report = (props: TabProps) => {

    const classes = ['tab-component', props.activeTab && 'active']
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes}>
            <h2>Report</h2>

        </div>
    )
}

export default Report