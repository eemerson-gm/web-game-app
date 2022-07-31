
export default function Canvas(props) {
    return (
        <div style={{ position: 'relative', ...props.style }}>
            <canvas id="_gamecanvas" width={props.width} height={props.height} />
        </div>
    )
}