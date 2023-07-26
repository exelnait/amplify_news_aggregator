import {putItem, TABLES} from "../aws-utils/dynamodb";
import {CreatePictureInput, Picture} from "../API";

export function createPicture(input: CreatePictureInput) {
    return putItem<Picture, CreatePictureInput>(TABLES.Picture, input, "Picture");
}