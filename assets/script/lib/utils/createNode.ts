import { Layers, Node, Sprite } from "cc"

export const createNode = () => {
    const node = new Node;
    node.addComponent(Sprite);
    node.layer = Layers.Enum.UI_2D;
    return node
}