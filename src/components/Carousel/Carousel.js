import React from 'react';

import './style.css'


function Slider(props) {
    return (
        <li data-item={props.alt}>
            <a href={props.target} onClick={console.log} draggable="false" style={{ eventPointer: "none" }}>
                <img src={props.img} alt={props.alt} />
            </a>
        </li>
    )
}

function Arrow(props) {
    return (
        <div className="arrow" onClick={props.onClick}><i className="icon-circle-left"></i></div>
    )
}

class Anchors extends React.Component {

    render() {
        const achors = [];
        for (let i = 0; i < this.props.length; i++) {
            achors.push(<li style={{ backgroundColor: ((this.props.current === i)||(this.props.current=== 3 && i === 0)) && 'red' }} key={i} onClick={() => this.props.onClick(i)}></li>)
        }
        return (
            <ul className="achors">
                {achors}
            </ul>
        )
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        const items = this.props.items.slice();
        items.push(this.props.items[0]);
        items.unshift(this.props.items[this.props.items.length - 1]);
        this.state = {
            current: 0,
            clickable: true,
            offset: 600,
            items: items,
            noAnimation: false,
        };
        this.startFlag = false;
        this.moveFlag = false;
        this.waitTime = 2000;
        // this.duration = 0.5;
    }

    intervalFunction = () => {

        this.interval = setTimeout(
            (interval) => this.changeSlider(this.state.current + 1, interval), this.waitTime, true);
    }

    clearIntervalFunction = () => {
        clearInterval(this.interval);
    }

    //添加定时器
    componentDidMount() {
        this.intervalFunction();
        // document.onvisibilitychange = e=>{
        //     if(!document.hidden){
        //         console.log('重设')
        //         this.intervalFunction();
        //     }else{
        //         console.log('取消')
        //         this.clearIntervalFunction();
        //     }
        // }
        window.ontransitionend = e => {
            if(e.target!==this.instance) return;
            let i = this.state.current;

            if (i >= this.props.items.length) {
                i = 0;
            } else if (i === -1) {
                i = this.props.items.length - 1;
            }
            if (i !== this.state.current) {
                this.setState({
                    noAnimation: true,
                }, function () {
                    this.setState({
                        current: i
                    }, function () {
                        setTimeout(() => {
                            this.setState({
                                noAnimation: false
                            })
                        }, 0);
                    })
                })
            }
            if(this.interval){
                clearTimeout(this.interval)
            }
            this.interval = setTimeout((interval) => this.changeSlider(this.state.current+1,interval), this.waitTime,true);
        }
    }
    //移除定时器
    componentWillUnmount() {
        this.clearIntervalFunction();
        window.ontransitionend = null;
    }
    changeSlider(i, interval) {
        if (!interval) {
            this.clearIntervalFunction();
            this.intervalFunction();
        }
        this.setState({
            current: i,
        })

        /* 
        const items = this.props.items;
        //距离
        let distance = i*600+600;
        //速度
        const speed = (distance-this.state.offset)/1000*60;
        const animation = ()=>{
            let offset = this.state.offset+speed
            //最后一次移动切换控制
            if(Math.abs(distance-offset)<=Math.abs(speed)){
                if(i===this.props.items.length){
                    distance = 600;
                    i = 0;
                }else if(i===-1){
                    distance = this.props.items.length * 600
                    i = this.props.items.length-1;
                }
                offset = distance
            }
            this.setState({
                offset:offset,
                current:i
            })
            if(offset!==distance){
                requestAnimationFrame(animation)
            }
        }
        requestAnimationFrame(animation) */
    }


    before() {
        //前一个元素
        this.changeSlider(this.state.current - 1)
    }

    after() {
        //后一个元素
        this.changeSlider(this.state.current + 1)
    }

    renderSilder(item, index) {
        return (
            <Slider
                key={index}
                target={item.target}
                img={item.img}
                alt={item.alt}
                clickable={this.state.clickable}
            />
        )
    }
    //开始拖动
    startHold = e => {
        this.startX = e.screenX;
        this.startFlag = true;
        this.moveFlag = false;
        this.setState({ clickable: true });
    }
    //鼠标拖动
    holdMove = e => {
        if (this.startFlag) {
            this.moveFlag = true;
        }
    }
    //结束拖动
    stopHold = e => {
        if (this.startFlag) {
            this.startFlag = false;
        }
    }

    captureClick = e => {
        if (this.moveFlag) {
            e.stopPropagation();
        }
    }

    render() {
        const sliders = this.state.items.map((item, index) => this.renderSilder(item, index));
        const style = {
            transform: "translateZ(0) translateX(-" + ((this.state.current + 1) * 600) + "px)",
            // transitionDuration:this.duration+'ms'
        };
        return (
            <div>
                <div className="CarouselContainer">
                    <Arrow onClick={() => this.before()} />
                    <div className="sliders">
                        <ul ref={instance=>this.instance = instance}
                            className={this.state.noAnimation ? '' : 'transition'}
                            style={style}
                            onMouseDownCapture={this.startHold}
                            onMouseMoveCapture={this.holdMove}
                            onMouseUpCapture={this.stopHold}
                            onClickCapture={this.captureClick}>
                            {sliders}
                        </ul>
                    </div>
                    <Arrow onClick={() => this.after()} />
                </div>
                <Anchors current={this.state.current} length={this.props.items.length} onClick={(i) => this.changeSlider(i)} />
            </div>
        )
    }
}

export default Container;