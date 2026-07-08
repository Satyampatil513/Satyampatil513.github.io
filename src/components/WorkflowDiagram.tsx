"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Handle,
  Position,
  MarkerType,
  BaseEdge,
  EdgeLabelRenderer,
  type Node,
  type Edge,
  type NodeProps,
  type EdgeProps,
} from "@xyflow/react";
import type { Workflow } from "@/lib/data";

const NODE_W = 140;
const NODE_H = 44;
const H_GAP = 46;
const LOOP_DIP = 64;

type StepData = {
  label: string;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isLoopFrom: boolean;
  isLoopTo: boolean;
};

function StepNode({ data }: NodeProps<Node<StepData>>) {
  const active = data.isLoopFrom || data.isLoopTo;
  return (
    <div
      className={`font-hand flex items-center justify-center gap-1.5 rounded-[999px] border-2 px-3 text-center leading-tight ${
        active
          ? "border-cyan/70 text-text-bright"
          : "border-[var(--panel-border)] text-text"
      }`}
      style={{ width: NODE_W, height: NODE_H, background: "var(--bg)", fontSize: 13 }}
    >
      {!data.isFirst && <Handle type="target" position={Position.Left} style={handleStyle} />}
      <span className={active ? "text-cyan" : "text-text-dim"} style={{ fontSize: 12 }}>
        {data.index + 1}.
      </span>
      <span className="truncate">{data.label}</span>
      {!data.isLast && <Handle type="source" position={Position.Right} style={handleStyle} />}
      {data.isLoopFrom && (
        <Handle type="source" position={Position.Bottom} id="loop-out" style={handleStyle} />
      )}
      {data.isLoopTo && (
        <Handle type="target" position={Position.Bottom} id="loop-in" style={handleStyle} />
      )}
    </div>
  );
}

/** Custom edge: always draws a pronounced hanging arc below the row, regardless of span. */
function LoopEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style,
  label,
}: EdgeProps) {
  const dipY = Math.max(sourceY, targetY) + LOOP_DIP;
  const midX = (sourceX + targetX) / 2;
  const path = `M ${sourceX} ${sourceY} C ${sourceX} ${dipY}, ${targetX} ${dipY}, ${targetX} ${targetY}`;

  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} style={style} />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="font-hand nodrag nopan pointer-events-none absolute rounded px-1.5"
            style={{
              transform: `translate(-50%, -50%) translate(${midX}px, ${dipY}px)`,
              color: "var(--cyan)",
              background: "var(--bg)",
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const handleStyle = { background: "var(--cyan)", opacity: 0.5, width: 5, height: 5 };
const nodeTypes = { step: StepNode };
const edgeTypes = { loop: LoopEdge };

export default function WorkflowDiagram({ steps, loopFrom, loopTo, loopLabel }: Workflow) {
  const n = steps.length;

  const nodes: Node<StepData>[] = useMemo(
    () =>
      steps.map((label, i) => ({
        id: String(i),
        type: "step",
        position: { x: i * (NODE_W + H_GAP), y: 0 },
        data: {
          label,
          index: i,
          isFirst: i === 0,
          isLast: i === n - 1,
          isLoopFrom: i === loopFrom,
          isLoopTo: i === loopTo,
        },
        draggable: false,
        selectable: false,
      })),
    [steps, n, loopFrom, loopTo],
  );

  const edges: Edge[] = useMemo(() => {
    const chain: Edge[] = [];
    for (let i = 0; i < n - 1; i++) {
      chain.push({
        id: `chain-${i}`,
        source: String(i),
        target: String(i + 1),
        type: "straight",
        style: { stroke: "var(--panel-border)", strokeWidth: 1.75 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "var(--text-dim)", width: 14, height: 14 },
      });
    }
    chain.push({
      id: "loop",
      source: String(loopFrom),
      sourceHandle: "loop-out",
      target: String(loopTo),
      targetHandle: "loop-in",
      type: "loop",
      animated: true,
      label: `↺ ${loopLabel}`,
      style: { stroke: "var(--cyan)", strokeWidth: 2, strokeDasharray: "5 3", opacity: 0.8 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "var(--cyan)", width: 13, height: 13 },
    });
    return chain;
  }, [n, loopFrom, loopTo, loopLabel]);

  const height = NODE_H + LOOP_DIP + 34;

  return (
    <div className="mt-5 border-t border-[var(--panel-border)] pt-4">
      <div className="mb-2 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-text-dim">
        <span className="h-1 w-1 rounded-full bg-cyan/60" />
        Pipeline Trace
      </div>
      <div style={{ width: "100%", height }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.06, minZoom: 0.3, maxZoom: 1 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          panOnScroll={false}
          preventScrolling={false}
        />
      </div>
    </div>
  );
}
