class Reply extends Component {
    state = { reply: null }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.reply(this.state.reply)
    };
    onChange = (e) => {
        this.setState({ reply: e.target.value })
    };
    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: this.props.hidden }}>
                <div className="img-push">
                    <input onChange={this.onChange} name="comment" type="text" className="form-control " placeholder="type a comment" /><button type="submit" className="form-control " >Comment</button>
                </div>
            </form>
        );
    }
}

export default Reply;