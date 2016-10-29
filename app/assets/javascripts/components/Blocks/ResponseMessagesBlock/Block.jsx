var ErrorsBlock = React.createClass({
    getInitialState() {
        return {
            list: [],
            success: false
        };
    },
    componentDidMount() {
        this.listenAjax();
    },
    listenAjax() {
        $('#new_user').bind('ajax:error', (xhr, data) => {
            this.setState({list: []});

            if (data.status == 422)
                this.setState({list: data.responseJSON.error});
            if (data.status == 403)
                this.setState({list: [data.responseText]})
        });

        $('#login_form').bind('ajax:error', (xhr, data) => {
            this.setState({list: []});
            if (data.status == 404)
                this.setState({list: [data.responseText]});
            if (data.status == 403)
                this.setState({list: [data.responseText]})
        });

        $('#edit_user_form').bind('ajax:success', (xhr, data) => {
            this.setState({list: [], success: true});
            this.setState({list: [data.message]});
        }).bind('ajax:error', (xhr, data) => {
            this.setState({list: [], success: false});
            if (data.status == 422)
                this.setState({list: data.responseJSON.error});
        });
    },
    clearErrors() {
        this.setState({list: []})
    },
    renderErrors() {
        var type;

        if (this.state.success)
            type = "alert alert-success load-fade";
        else
            type = "alert alert-danger load-fade";


        return (
            <div className={type}>
                <button type="button" className="close" onClick={this.clearErrors}>
                    <span>&times;</span>
                </button>
                <List messages={this.state.list}/>
            </div>
        );
    },
    render() {

        return (this.state.list.length) ? this.renderErrors() : null


    }
});

export default ErrorsBlock