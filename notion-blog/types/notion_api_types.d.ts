/**
 * Notion API Types
 *
 * This file contains type definitions for common object types across various interfaces in the Notion API.
 * In the future, the contents of this file will be generated from an API definition.
 */
import { PropertyValueMap } from './api-endpoints';
import { DistributiveExtend, DistributiveOmit, RequiredBy } from './type-utils';
export interface PaginationParameters {
  start_cursor?: string;
  page_size?: number;
}
export interface PaginatedList<
  O extends APISingularObject = APISingularObject
> {
  object: 'list';
  results: O[];
  has_more: boolean;
  next_cursor: string | null;
}
export declare type APIObject = APISingularObject | PaginatedList;
export declare type APISingularObject = Database | Page | User | Block;
export declare type Block =
  | ParagraphBlock
  | HeadingOneBlock
  | HeadingTwoBlock
  | HeadingThreeBlock
  | BulletedListItemBlock
  | NumberedListItemBlock
  | ToDoBlock
  | ToggleBlock
  | ChildPageBlock
  | CalloutBlock
  | QuoteBlock
  | CodeBlock
  | ImageBlock
  | BookmarkBlock
  | ColumnListBlock
  | ColumnBlock
  | TableBlock
  | TableRowBlock
  | Divider
  | UnsupportedBlock;
export interface BlockBase {
  object: 'block';
  id: string;
  type: string;
  parent: ParentDatabase | ParentPage | ParentWorkspace | ParentBlock; //addtional
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  children: Block[]; //addtional
  depth: number; //addtional
}
export interface ParagraphBlock extends BlockBase {
  type: 'paragraph';
  paragraph: {
    color: 'string'; // additional
    rich_text: RichText[];
    children?: Block[];
  };
}
export interface HeadingOneBlock extends BlockBase {
  type: 'heading_1';
  heading_1: {
    rich_text: RichText[];
    is_toggleable: boolean;
  };
  has_children: false;
}
export interface HeadingTwoBlock extends BlockBase {
  type: 'heading_2';
  heading_2: {
    rich_text: RichText[];
    is_toggleable: boolean;
  };
  has_children: false;
}
export interface HeadingThreeBlock extends BlockBase {
  type: 'heading_3';
  heading_3: {
    rich_text: RichText[];
    is_toggleable: boolean;
  };
  has_children: false;
}
export interface BulletedListItemBlock extends BlockBase {
  type: 'bulleted_list_item';
  bulleted_list_item: {
    rich_text: RichText[];
    children?: Block[];
  };
}
export interface NumberedListItemBlock extends BlockBase {
  type: 'numbered_list_item';
  numbered_list_item: {
    rich_text: RichText[];
    children?: Block[];
  };
}
export interface ToDoBlock extends BlockBase {
  type: 'to_do';
  to_do: {
    rich_text: RichText[];
    checked: boolean;
    children?: Block[];
  };
}
export interface ToggleBlock extends BlockBase {
  type: 'toggle';
  toggle: {
    rich_text: RichText[];
    children?: Block[];
  };
}
export interface ChildPageBlock extends BlockBase {
  type: 'child_page';
  icon: DefaultEmoji | FileEmoji;
  child_page: {
    title: string;
  };
}
export interface Divider extends BlockBase {
  type: 'divider';
  driver: {
    title: string;
  };
}
//addtional **************************************************************************
export interface CalloutBlock extends BlockBase {
  type: 'callout';
  callout: {
    color: string;
    icon: {
      emoji: string;
      type: string;
    };
    rich_text: RichText[];
  };
}
export interface QuoteBlock extends BlockBase {
  type: 'quote';
  quote: {
    color: string;
    rich_text: RichText[];
  };
}
export interface CodeBlock extends BlockBase {
  type: 'code';
  code: {
    caption: RichText[];
    language: string;
    rich_text: RichText[];
  };
}
export interface ImageBlock extends BlockBase {
  type: 'image';
  image: {
    caption: RichText[];
    file: {
      expriy_time: string;
      url: string;
    };
  };
}
export interface BookmarkBlock extends BlockBase {
  type: 'bookmark';
  bookmark: {
    caption: RichText[];
    url: string;
  };
}
export interface ColumnListBlock extends BlockBase {
  type: 'column_list';
}
export interface ColumnBlock extends BlockBase {
  type: 'column';
}
export interface TableBlock extends BlockBase {
  type: 'table';
  table: {
    has_column_header: boolean;
    has_row_header: boolean;
    table_width: number;
  };
}
export interface TableRowBlock extends BlockBase {
  type: 'table_row';
  table_row: {
    cells: CellOfTableType[][];
  };
}
export interface CellOfTableType {
  annotations: Annotations;
  href: string;
  plan_text: string;
  text: {
    content: string;
    link: string;
  };
}
//************************************************************************************
export interface UnsupportedBlock extends BlockBase {
  type: 'unsupported';
}
export interface Database {
  object: 'database';
  id: string;
  parent: ParentPage | ParentWorkspace;
  created_time: string;
  last_edited_time: string;
  title: RichText[];
  properties: {
    [propertyName: string]: Property;
  };
}
export declare type Property =
  | TitleProperty
  | RichTextProperty
  | NumberProperty
  | SelectProperty
  | MultiSelectProperty
  | DateProperty
  | PeopleProperty
  | FilesProperty
  | CheckboxProperty
  | URLProperty
  | EmailProperty
  | PhoneNumberProperty
  | FormulaProperty
  | RelationProperty
  | RollupProperty
  | CreatedTimeProperty
  | CreatedByProperty
  | LastEditedTimeProperty
  | LastEditedByProperty;
export interface PropertyBase {
  id: string;
  type: string;
}
export interface TitleProperty extends PropertyBase {
  type: 'title';
  title: Record<string, never>;
}
export interface RichTextProperty extends PropertyBase {
  type: 'rich_text';
  rich_text: Record<string, never>;
}
export interface NumberProperty extends PropertyBase {
  type: 'number';
  number: {
    format:
      | 'number'
      | 'number_with_commas'
      | 'percent'
      | 'dollar'
      | 'euro'
      | 'pound'
      | 'yen'
      | 'ruble'
      | 'rupee'
      | 'won'
      | 'yuan';
  };
}
export interface SelectProperty extends PropertyBase {
  type: 'select';
  select: {
    options: SelectOption[];
  };
}
export interface MultiSelectProperty extends PropertyBase {
  type: 'multi_select';
  multi_select: {
    options: MultiSelectOption[];
  };
}
export interface DateProperty extends PropertyBase {
  type: 'date';
  date: Record<string, never>;
}
export interface PeopleProperty extends PropertyBase {
  type: 'people';
  people: Record<string, never>;
}
export interface FilesProperty extends PropertyBase {
  type: 'files';
  file: Record<string, never>;
}
export interface CheckboxProperty extends PropertyBase {
  type: 'checkbox';
  checkbox: Record<string, never>;
}
export interface URLProperty extends PropertyBase {
  type: 'url';
  url: Record<string, never>;
}
export interface EmailProperty extends PropertyBase {
  type: 'email';
  email: Record<string, never>;
}
export interface PhoneNumberProperty extends PropertyBase {
  type: 'phone_number';
  phone_number: Record<string, never>;
}
export interface FormulaProperty extends PropertyBase {
  type: 'formula';
  formula: {
    expression: string;
  };
}
export interface RelationProperty extends PropertyBase {
  type: 'relation';
  relation: {
    database_id: string;
    synced_property_name?: string;
    synced_property_id?: string;
  };
}
export interface RollupProperty extends PropertyBase {
  type: 'rollup';
  rollup: {
    relation_property_name: string;
    relation_property_id: string;
    rollup_property_name: string;
    rollup_property_id: string;
    function:
      | 'count_all'
      | 'count_values'
      | 'count_unique_values'
      | 'count_empty'
      | 'count_not_empty'
      | 'percent_empty'
      | 'percent_not_empty'
      | 'sum'
      | 'average'
      | 'median'
      | 'min'
      | 'max'
      | 'range'
      | 'show_original';
  };
}
export interface CreatedTimeProperty extends PropertyBase {
  type: 'created_time';
  created_time: Record<string, never>;
}
export interface CreatedByProperty extends PropertyBase {
  type: 'created_by';
  created_by: Record<string, never>;
}
export interface LastEditedTimeProperty extends PropertyBase {
  type: 'last_edited_time';
  last_edited_time: Record<string, never>;
}
export interface LastEditedByProperty extends PropertyBase {
  type: 'last_edited_by';
  last_edited_by: Record<string, never>;
}
export declare type User = PersonUser | BotUser;
export interface UserBase {
  object: 'user';
  id: string;
  type?: string;
  name?: string;
  avatar_url?: string;
}
export interface PersonUser extends UserBase {
  type?: 'person';
  person?: {
    email: string;
  };
}
export interface BotUser extends UserBase {
  type?: 'bot';
}
export interface SelectOptionBase {
  color?: Color;
}
export interface SelectOptionWithName extends SelectOptionBase {
  name: string;
  id?: never;
}
export interface SelectOptionWithId extends SelectOptionBase {
  name?: never;
  id: string;
}
export declare type SelectOption = SelectOptionWithName | SelectOptionWithId;
export declare type MultiSelectOption = SelectOption;
export interface SearchSort {
  direction: 'ascending' | 'descending';
  timestamp: 'last_edited_time';
}
export interface SearchFilter {
  value: 'page' | 'database';
  property: 'object';
}
export declare type Color =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';
export declare type BackgroundColor =
  | 'gray_background'
  | 'brown_background'
  | 'orange_background'
  | 'yellow_background'
  | 'green_background'
  | 'blue_background'
  | 'purple_background'
  | 'pink_background'
  | 'red_background';
export declare type Filter = SinglePropertyFilter | CompoundFilter;
export declare type SinglePropertyFilter =
  | TextFilter
  | NumberFilter
  | CheckboxFilter
  | SelectFilter
  | MultiSelectFilter
  | DateFilter
  | PeopleFilter
  | FilesFilter
  | RelationFilter
  | FormulaFilter;
export interface CompoundFilter {
  or?: Filter[];
  and?: Filter[];
}
export interface SinglePropertyFilterBase {
  property: string;
}
/** A text filter condition applies to database properties of types "title", "rich_text", "url", "email", and "phone". */
export interface TextFilter extends SinglePropertyFilterBase {
  text: {
    equals?: string;
    does_not_equal?: string;
    contains?: string;
    does_not_contain?: string;
    starts_with?: string;
    ends_with?: string;
    is_empty?: true;
    is_not_empty?: true;
  };
}
export interface NumberFilter extends SinglePropertyFilterBase {
  number: {
    equals?: number;
    does_not_equal?: number;
    greater_than?: number;
    less_than?: number;
    greater_than_or_equal_to?: number;
    less_than_or_equal_to?: number;
    is_empty?: true;
    is_not_empty?: true;
  };
}
export interface CheckboxFilter extends SinglePropertyFilterBase {
  checkbox: {
    equals?: boolean;
    does_not_equal?: boolean;
  };
}
export interface SelectFilter extends SinglePropertyFilterBase {
  select: {
    equals?: string;
    does_not_equal?: string;
    is_empty?: true;
    is_not_empty?: true;
  };
}
export interface MultiSelectFilter extends SinglePropertyFilterBase {
  multi_select: {
    contains?: string;
    does_not_contain?: string;
    is_empty?: true;
    is_not_empty?: true;
  };
}
export interface DateFilter extends SinglePropertyFilterBase {
  date: {
    equals?: string;
    before?: string;
    after?: string;
    on_or_before?: string;
    is_empty?: true;
    is_not_empty?: true;
    on_or_after?: string;
    past_week?: Record<string, never>;
    past_month?: Record<string, never>;
    past_year?: Record<string, never>;
    next_week?: Record<string, never>;
    next_month?: Record<string, never>;
    next_year?: Record<string, never>;
  };
}
export interface PeopleFilter extends SinglePropertyFilterBase {
  people: {
    contains?: string;
    does_not_contain?: string;
    is_empty?: true;
    is_not_empty?: true;
  };
}
export interface FilesFilter extends SinglePropertyFilterBase {
  files: {
    is_empty?: true;
    is_not_empty?: true;
  };
}
export interface RelationFilter extends SinglePropertyFilterBase {
  relation: {
    contains?: string;
    does_not_contain?: string;
    is_empty?: true;
    is_not_empty?: true;
  };
}
export interface FormulaFilter extends SinglePropertyFilterBase {
  formula: {
    text?: Omit<TextFilter, 'property'>;
    checkbox?: Omit<CheckboxFilter, 'property'>;
    number?: Omit<NumberFilter, 'property'>;
    date?: Omit<DateFilter, 'property'>;
  };
}
export interface Sort {
  property?: string;
  timestamp?: 'created_time' | 'last_edited_time';
  direction: 'ascending' | 'descending';
}
//*********************************edit******************************************
export interface Page {
  object: 'page';
  id: string;
  parent: ParentDatabase | ParentPage | ParentWorkspace | ParentBlock;
  created_time: string;
  last_edited_time: string;
  archived: boolean;
  properties: PropertyValueMap;
  url: string;
  icon: any;
}
//*******************************************************************************
export declare type ParentInput =
  | Omit<ParentDatabase, 'type'>
  | Omit<ParentPage, 'type'>;
export declare type ParentPageInput = Omit<ParentPage, 'type'>;
interface ParentDatabase {
  type: 'database_id';
  database_id: string;
}
//***************************edit**************************************
export interface ParentPage {
  type: 'page_id';
  page_id: string;
}
//*********************************************************************
//***************************add***************************************
export interface ParentBlock {
  type: 'block_id';
  block_id: string;
}

//*********************************************************************
interface ParentWorkspace {
  type: 'workspace';
}
export declare type PropertyValue =
  | TitlePropertyValue
  | RichTextPropertyValue
  | NumberPropertyValue
  | SelectPropertyValue
  | MultiSelectPropertyValue
  | DatePropertyValue
  | FormulaPropertyValue
  | RollupPropertyValue
  | PeoplePropertyValue
  | FilesPropertyValue
  | CheckboxPropertyValue
  | URLPropertyValue
  | EmailPropertyValue
  | PhoneNumberPropertyValue
  | CreatedTimePropertyValue
  | CreatedByPropertyValue
  | LastEditedTimePropertyValue
  | LastEditedByPropertyValue;
export declare type PropertyValueWithoutId = DistributiveOmit<
  PropertyValue,
  'id'
>;
export declare type InputPropertyValue = DistributiveExtend<
  DistributiveOmit<InputPropertyValueWithRequiredId, 'id'>,
  {
    id?: string;
  }
>;
export declare type InputPropertyValueWithRequiredId =
  | TitleInputPropertyValue
  | RichTextInputPropertyValue
  | NumberPropertyValue
  | SelectPropertyValue
  | MultiSelectPropertyValue
  | DatePropertyValue
  | FormulaPropertyValue
  | RollupPropertyValue
  | PeoplePropertyValue
  | FilesPropertyValue
  | CheckboxPropertyValue
  | URLPropertyValue
  | EmailPropertyValue
  | PhoneNumberPropertyValue
  | CreatedTimePropertyValue
  | CreatedByPropertyValue
  | LastEditedTimePropertyValue
  | LastEditedByPropertyValue;
export interface PropertyValueBase {
  id: string;
  type: string;
}
export interface TitlePropertyValue extends PropertyValueBase {
  type: 'title';
  title: RichText[];
}
export interface RichTextPropertyValue extends PropertyValueBase {
  type: 'rich_text';
  rich_text: RichText[];
}
export interface TitleInputPropertyValue extends PropertyValueBase {
  type: 'title';
  title: RichTextInput[];
}
export interface RichTextInputPropertyValue extends PropertyValueBase {
  type: 'rich_text';
  rich_text: RichTextInput[];
}
export interface NumberPropertyValue extends PropertyValueBase {
  type: 'number';
  number: number;
}
export interface SelectPropertyValue extends PropertyValueBase {
  type: 'select';
  select: SelectOption;
}
export interface MultiSelectPropertyValue extends PropertyValueBase {
  type: 'multi_select';
  multi_select: MultiSelectOption[];
}
export interface DatePropertyValue extends PropertyValueBase {
  type: 'date';
  date: {
    start: string;
    end?: string;
  };
}
export interface FormulaPropertyValue extends PropertyValueBase {
  type: 'formula';
  formula:
    | StringFormulaValue
    | NumberFormulaValue
    | BooleanFormulaValue
    | DateFormulaValue;
}
export interface StringFormulaValue {
  type: 'string';
  string?: string;
}
export interface NumberFormulaValue {
  type: 'number';
  number?: number;
}
export interface BooleanFormulaValue {
  type: 'boolean';
  boolean: boolean;
}
export interface DateFormulaValue {
  type: 'date';
  date: DatePropertyValue;
}
export interface RollupPropertyValue extends PropertyValueBase {
  type: 'rollup';
  rollup: NumberRollupValue | DateRollupValue | ArrayRollupValue;
}
export interface NumberRollupValue {
  type: 'number';
  number: number;
}
export interface DateRollupValue {
  type: 'date';
  date: DatePropertyValue;
}
export interface ArrayRollupValue {
  type: 'array';
  array: PropertyValueWithoutId[];
}
export interface PeoplePropertyValue extends PropertyValueBase {
  type: 'people';
  people: User[];
}
export interface FilesPropertyValue extends PropertyValueBase {
  type: 'files';
  files: {
    name: string;
  }[];
}
export interface CheckboxPropertyValue extends PropertyValueBase {
  type: 'checkbox';
  checkbox: boolean;
}
export interface URLPropertyValue extends PropertyValueBase {
  type: 'url';
  url: string;
}
export interface EmailPropertyValue extends PropertyValueBase {
  type: 'email';
  email: string;
}
export interface PhoneNumberPropertyValue extends PropertyValueBase {
  type: 'phone_number';
  phone_number: string;
}
export interface CreatedTimePropertyValue extends PropertyValueBase {
  type: 'created_time';
  created_time: string;
}
export interface CreatedByPropertyValue extends PropertyValueBase {
  type: 'created_by';
  created_by: User;
}
export interface LastEditedTimePropertyValue extends PropertyValueBase {
  type: 'last_edited_time';
  last_edited_time: string;
}
export interface LastEditedByPropertyValue extends PropertyValueBase {
  type: 'last_edited_by';
  last_edited_by: User;
}
export declare type RichText =
  | RichTextText
  | RichTextMention
  | RichTextEquation;
export declare type RichTextInput =
  | RichTextTextInput
  | RichTextMention
  | RichTextEquation;
export interface RichTextBaseInput {
  plain_text?: string;
  href?: string;
  annotations?: Annotations;
  type: string;
}
export interface RichTextTextInput extends RichTextBaseInput {
  type: 'text';
  text: {
    content: string;
    link?: {
      type: 'url';
      url: string;
    };
  };
}
export declare type RichTextBase = RequiredBy<
  RichTextBaseInput,
  'plain_text' | 'annotations'
>;
export declare type RichTextText = RequiredBy<
  RichTextTextInput,
  'plain_text' | 'annotations'
>;
export interface RichTextMention extends RichTextBase {
  type: 'mention';
  mention: UserMention | PageMention | DatabaseMention | DateMention;
}
export interface UserMention {
  type: 'user';
  user: User;
}
export interface PageMention {
  type: 'page';
  page: {
    id: string;
  };
}
export interface DatabaseMention {
  type: 'database';
  database: {
    id: string;
  };
}
export interface DateMention {
  type: 'date';
  date: DatePropertyValue;
}
export interface RichTextEquation extends RichTextBase {
  type: 'equation';
  equation: {
    expression: string;
  };
}
export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: Color | BackgroundColor;
}
export declare type PropertySchema =
  | TitlePropertySchema
  | RichTextPropertySchema
  | NumberPropertySchema
  | SelectPropertySchema
  | MultiSelectPropertySchema
  | DatePropertySchema
  | PeoplePropertySchema
  | FilePropertySchema
  | CheckboxPropertySchema
  | URLPropertySchema
  | EmailPropertySchema
  | PhoneNumberPropertySchema
  | CreatedTimePropertySchema
  | CreatedByPropertySchema
  | LastEditedTimePropertySchema
  | LastEditedByPropertySchema;
export interface TitlePropertySchema {
  title: Record<string, never>;
}
export interface RichTextPropertySchema {
  rich_text: Record<string, never>;
}
export interface NumberPropertySchema {
  number: {
    format?:
      | 'number'
      | 'number_with_commas'
      | 'percent'
      | 'dollar'
      | 'euro'
      | 'pound'
      | 'yen'
      | 'ruble'
      | 'rupee'
      | 'won'
      | 'yuan';
  };
}
interface SelectOptionSchema {
  name: string;
  color?: Color;
}
declare type MultiSelectOptionSchema = SelectOptionSchema;
export interface SelectPropertySchema {
  select: {
    options?: SelectOptionSchema[];
  };
}
export interface MultiSelectPropertySchema {
  multi_select: {
    options?: MultiSelectOptionSchema[];
  };
}
export interface DatePropertySchema {
  date: Record<string, never>;
}
export interface PeoplePropertySchema {
  people: Record<string, never>;
}
export interface FilePropertySchema {
  files: Record<string, never>;
}
export interface CheckboxPropertySchema {
  checkbox: Record<string, never>;
}
export interface URLPropertySchema {
  url: Record<string, never>;
}
export interface EmailPropertySchema {
  email: Record<string, never>;
}
export interface PhoneNumberPropertySchema {
  phone_number: Record<string, never>;
}
export interface CreatedTimePropertySchema {
  created_time: Record<string, never>;
}
export interface CreatedByPropertySchema {
  created_by: Record<string, never>;
}
export interface LastEditedTimePropertySchema {
  last_edited_time: Record<string, never>;
}
export interface LastEditedByPropertySchema {
  last_edited_by: Record<string, never>;
}
export {};
//# sourceMappingURL=api-types.d.ts.map
//additional
export interface DefaultEmoji {
  type: 'emoji';
  emoji: string;
}
export interface FileEmoji {
  type: 'file';
  file: {
    url: string;
  };
}
